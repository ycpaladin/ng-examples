import { NgModule, ModuleWithProviders } from '@angular/core';
import { ActionSubject } from './action-subject';
import { ActionReducerMap } from './models';
import { ReducerManager } from './reducer-manager';
import { INIT_STATE, REDUCER } from './token';
import { Store } from './store';
import { State } from './state';


@NgModule()
export class NgrxWheelStoreModule {
  static forRoot(reducer: ActionReducerMap<any, any>, initialState?: any): ModuleWithProviders<NgrxWheelStoreModule> {
    return {
      ngModule: NgrxWheelStoreModule,
      providers: [
        { provide: INIT_STATE, useValue: initialState },
        { provide: REDUCER, useValue: reducer },
        ActionSubject,
        ReducerManager,
        State,
        Store
      ]
    }
  }
}
