import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo06Component } from './demo06.component';

const routes: Routes = [{ path: '', component: Demo06Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo06RoutingModule { }
