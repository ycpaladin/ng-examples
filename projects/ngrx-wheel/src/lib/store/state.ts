import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, queueScheduler, Observable } from 'rxjs';
import { observeOn, scan, withLatestFrom } from 'rxjs/operators';
import { ActionSubject } from './action-subject';
import { Action, ActionReducer } from './models';
import { ReducerManager } from './reducer-manager';
import { INIT_STATE } from './token';

@Injectable()
export class State<T = any> extends BehaviorSubject<any> implements OnDestroy {

  constructor(
    actionSubject: ActionSubject,
    reducerManager: ReducerManager,
    @Inject(INIT_STATE) public initialState: any
  ) {
    super(initialState);

    const actionOnQueue$ = actionSubject.pipe(observeOn(queueScheduler)); // ????

    const withLatestReducer$ = actionOnQueue$.pipe(withLatestFrom(reducerManager));


    const seed = { state: initialState }; //  as { state: any, action: Action };

    const stateAndAction$: Observable<{
      state: any;
      action?: Action;
    }> = withLatestReducer$.pipe(
      scan(reduceState, seed)
    );

    stateAndAction$.subscribe(({ state, action }) => {
      this.next(state);
      // actionSubject.next(action) //
    })

  }

  ngOnDestroy(): void {
    this.complete();
  }
}


function reduceState(value: { state: any }, [action, reducer]: [Action, ActionReducer<any, Action>]) {
  const state = reducer(value.state, action);
  return {
    state,
    action
  }
}
