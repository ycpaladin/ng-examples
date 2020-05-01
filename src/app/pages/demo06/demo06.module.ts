import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo06RoutingModule } from './demo06-routing.module';
import { Demo06Component } from './demo06.component';
import { Child01Component } from './child01/child01.component';
import { Child02Component } from './child02/child02.component';


@NgModule({
  declarations: [Demo06Component, Child01Component, Child02Component],
  imports: [
    CommonModule,
    Demo06RoutingModule
  ]
})
export class Demo06Module { }
