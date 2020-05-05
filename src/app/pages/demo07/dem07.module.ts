import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dem07RoutingModule } from './dem07-routing.module';
import { Dem07Component } from './dem07.component';
import { CommonsModule } from 'src/app/modules/common/common.module';
import { NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [Dem07Component],
  imports: [
    CommonModule,
    CommonsModule,
    Dem07RoutingModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class Dem07Module { }
