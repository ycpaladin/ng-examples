import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Demo01Component } from './demo01.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Service1Service } from './services/service1.service';
import { CommonsModule } from 'src/app/modules/common/common.module';
import { NzInputModule } from 'ng-zorro-antd/input';

const routes: Routes = [
  {
    path: '',
    component: Demo01Component
  }
];

@NgModule({
  declarations: [Demo01Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonsModule,
    NzInputModule
  ],
  // providers: [
  //   Service1Service
  // ]
})
export class Demo01Module { }
