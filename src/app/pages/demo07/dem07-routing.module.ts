import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dem07Component } from './dem07.component';

const routes: Routes = [{ path: '', component: Dem07Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dem07RoutingModule { }
