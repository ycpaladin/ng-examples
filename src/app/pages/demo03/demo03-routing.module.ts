import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo03Component } from './demo03.component';

const routes: Routes = [{ path: '', component: Demo03Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo03RoutingModule { }
