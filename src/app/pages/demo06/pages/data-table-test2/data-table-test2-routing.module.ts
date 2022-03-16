import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableTest2Component } from './data-table-test2.component';

const routes: Routes = [{ path: '', component: DataTableTest2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableTest2RoutingModule { }
