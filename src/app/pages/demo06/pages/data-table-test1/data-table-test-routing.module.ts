import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableTestComponent } from './data-table-test.component';

const routes: Routes = [{ path: '', component: DataTableTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableTestRoutingModule { }
