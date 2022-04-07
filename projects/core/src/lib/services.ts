import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, mergeMap, shareReplay } from 'rxjs/operators';

import { IUserService, UserModel, SafeType, LoginModel } from './interfaces';
import { PermList } from './interfaces/permission';
import { USER_SERVICE } from './token';

@Injectable()
export class User<T extends UserModel = UserModel> extends Observable<T> implements OnDestroy {

  private _inner = new BehaviorSubject<LoginModel>(undefined);
  constructor(@Inject(USER_SERVICE) public userService: IUserService<T>) {
    super();
    this.source = this._inner.pipe(
      mergeMap((model) => {
        return model ? this.userService.login(model.username, model.password, model.extra).pipe(
          catchError(() => of(null)),
        ) : of(null);
      }),
      shareReplay()
    );
  }

  login(username: string, password: string, extra: SafeType = {}): void {
    this._inner.next({ username, password, extra });
  }

  logout(): void {
    const sub$ = this.userService.logout().subscribe(result => {
      if (result) {
        this._inner.next(null);
      }
      Promise.resolve().then(() => sub$.unsubscribe());
    })
  }

  ngOnDestroy(): void {
    this._inner.complete();
    // super.complete();
  }


}

@Injectable()
export class Role extends Observable<PermList> implements OnDestroy {

  constructor(user: User) {
    super();
    this.source = user.pipe(
      mergeMap(u => u ? user.userService.getPermList() : of(null)),
      shareReplay()
    );
  }

  ngOnDestroy(): void {
  }

}
