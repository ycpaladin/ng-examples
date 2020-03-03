import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Demo02Component } from './pages/demo02/demo02.component';


const routes: Routes = [{
  path: '',
  component: Demo02Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo02RoutingModule { }
