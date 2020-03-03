import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo04RoutingModule } from './demo04-routing.module';
import { Demo04Component } from './demo04/demo04.component';
import { ParentComponent } from '../demo04/components/parent/parent.component';
import { Child01Component } from '../demo04/components/child01/child01.component';
import { Child02Component } from '../demo04/components/child02/child02.component';
import { Child03Component } from '../demo04/components/child03/child03.component';
import { ITableService } from './models';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [Demo04Component, ParentComponent, Child01Component, Child02Component, Child03Component],
  imports: [
    CommonModule,
    Demo04RoutingModule
  ],
  providers: [
    { provide: ITableService, useClass: UserService }
  ]
})
export class Demo04Module { }
