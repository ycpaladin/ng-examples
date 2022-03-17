import { Inject, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActionSubject } from "./action-subject";
import { Action, ActionReducerMap, ActionReducer } from "./models";
import { INIT_STATE, REDUCER } from "./token";


/**
 * ReducerManager 的作用在于可以添加或者删除reducer，
 */

@Injectable()
export class ReducerManager extends BehaviorSubject<ActionReducer<any, any>> implements OnDestroy {

  constructor(
    public actionSubject: ActionSubject,
    @Inject(REDUCER) reducer: ActionReducerMap<any, any>,
    @Inject(INIT_STATE) initialState: any
  ) {
    super(combineReducers(reducer, initialState));
  }


  addFeature(): void {
    // TODO...
  }

  addFeatures(): void {
    // TODO...

  }

  addReducer(): void {
    // TODO...

  }

  addReducers(): void {
    // TODO...

  }


  private updateReducer(featureKeys: string[]): void {
    // TODO 告诉外部reducer已经发生变化
  }

  ngOnDestroy(): void {
    this.complete();
  }
}


const combineReducers = <T>(reducer: ActionReducerMap<T, Action>, initialState: any = {}) => {
  return (state = initialState, action: Action) => {
    return Object.keys(reducer).reduce((prev, key) => {
      const _reducer = reducer[key];
      const _state = state[key];
      prev[key] = _reducer(_state, action);
      return prev;
    }, {})
  }
}
