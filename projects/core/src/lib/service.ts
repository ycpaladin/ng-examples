import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, mergeMap, shareReplay } from 'rxjs/operators';

import { IUserService, UserModel, SafeType, LoginModel } from './interfaces';
import { USER_SERVICE } from './token';

@Injectable()
export class User<T extends UserModel = UserModel> extends BehaviorSubject<T> implements OnDestroy {

  private _inner = new Subject<LoginModel>();
  constructor(@Inject(USER_SERVICE) public userService: IUserService) {
    super(null);
    this.source = this._inner.pipe(
      mergeMap(
        (model) => model ? this.userService.login(model.username, model.password, model.extra).pipe(
          mergeMap((user => user ? of(user) : userService.getUser())),
          catchError(() => of(null)),
          shareReplay()
        ) : of(null)
      )
    )
  }

  get isLogin(): boolean {
    return !!this.value;
  }

  login(username: string, password: string, extra: SafeType): void {
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
    this.complete();
  }


}
