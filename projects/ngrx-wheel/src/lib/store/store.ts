import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Operator } from 'rxjs';
import { ActionSubject } from './action-subject';
import { ReducerManager } from './reducer-manager';
import { State } from './state';
import { INIT_STATE } from './token';
import { map } from 'rxjs/operators';
import { Action } from './models';

@Injectable()
export class Store<T = any> extends Observable<any> implements OnDestroy {

  constructor(
    public actionSubject: ActionSubject,
    public reducerManager: ReducerManager,
    public state: State,
    @Inject(INIT_STATE) public initialState: any
  ) {
    super();
  }

  dispatch(action: Action): void {
    this.actionSubject.next(action);
  }

  /**
   * 为了给EffectModule中使用
   * @param action
   */
  next(action: Action): void {
    this.actionSubject.next(action);
  }

  complete(): void {
    this.actionSubject.complete();
  }

  error(err: any): void {
    this.actionSubject.error(err);
  }

  // override lift<R>(operator: Operator<T, R>): Store<R> {
  //   // const store = new Store<R>(this.actionSubject, this.reducerManager, this)
  //   return this;
  // }

  select<R>(pathOrMapFn: (state: T) => R): Observable<R> {
    // TODO...
    return this.state.pipe(
      map(pathOrMapFn)
    )
  }

  ngOnDestroy(): void {
    this.actionSubject.complete();
  }
}
