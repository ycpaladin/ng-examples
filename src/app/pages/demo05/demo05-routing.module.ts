import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Demo05IndexComponent } from './pages/demo05-index/demo05-index.component';


const routes: Routes = [{
  path: '',
  component: Demo05IndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo05RoutingModule { }
