import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo02RoutingModule } from './demo02-routing.module';
import { Demo02Component } from './pages/demo02/demo02.component';
import { ParentComponent } from './components/parent/parent.component';
import { Child01Component } from './components/child01/child01.component';
import { Child02Component } from './components/child02/child02.component';
import { Child03Component } from './components/child03/child03.component';


@NgModule({
  declarations: [Demo02Component, ParentComponent, Child01Component, Child02Component, Child03Component],
  imports: [
    CommonModule,
    Demo02RoutingModule
  ]
})
export class Demo02Module { }
