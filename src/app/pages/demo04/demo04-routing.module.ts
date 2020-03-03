import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Demo04Component } from './demo04/demo04.component';


const routes: Routes = [{
  path: '',
  component: Demo04Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo04RoutingModule { }
