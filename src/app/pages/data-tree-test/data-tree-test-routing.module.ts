import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTreeTestComponent } from './data-tree-test.component';

const routes: Routes = [{ path: '', component: DataTreeTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTreeTestRoutingModule { }
