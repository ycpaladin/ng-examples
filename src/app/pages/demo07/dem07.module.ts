import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dem07RoutingModule } from './dem07-routing.module';
import { Dem07Component } from './dem07.component';


@NgModule({
  declarations: [Dem07Component],
  imports: [
    CommonModule,
    Dem07RoutingModule
  ]
})
export class Dem07Module { }
