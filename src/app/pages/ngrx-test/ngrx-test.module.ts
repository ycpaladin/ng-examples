import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxTestRoutingModule } from './ngrx-test-routing.module';
import { NgrxTestComponent } from './ngrx-test.component';
import { reducer } from './store/reducers';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgrxWheelStoreModule } from 'projects/ngrx-wheel/src/lib/store';
import { NgrxWheelEffectModule } from 'projects/ngrx-wheel/src/public-api';
import { TestEffects } from './store/effects';


@NgModule({
  declarations: [
    NgrxTestComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NgrxWheelStoreModule.forRoot({ name: reducer }),
    NgrxWheelEffectModule.forRoot([TestEffects]),
    NgrxTestRoutingModule
  ]
})
export class NgrxTestModule { }
