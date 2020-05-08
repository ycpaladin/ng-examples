import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo09Component } from './demo09.component';

const routes: Routes = [{ path: '', component: Demo09Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo09RoutingModule { }
