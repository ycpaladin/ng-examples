import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo03RoutingModule } from './demo03-routing.module';
import { Demo03Component } from './demo03.component';


@NgModule({
  declarations: [Demo03Component],
  imports: [
    CommonModule,
    Demo03RoutingModule
  ]
})
export class Demo03Module { }
