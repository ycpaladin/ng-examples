import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgrxTestComponent } from './ngrx-test.component';

const routes: Routes = [{ path: '', component: NgrxTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgrxTestRoutingModule { }
