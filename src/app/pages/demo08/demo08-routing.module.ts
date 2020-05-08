import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo08Component } from './demo08.component';

const routes: Routes = [{ path: '', component: Demo08Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo08RoutingModule { }
