import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo09RoutingModule } from './demo09-routing.module';
import { Demo09Component } from './demo09.component';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [Demo09Component],
  imports: [
    CommonModule,
    Demo09RoutingModule,
    NzButtonModule
  ]
})
export class Demo09Module { }
