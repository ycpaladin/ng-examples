import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';
import { DataTableTestComponent } from './data-table-test.component';

const routes: Routes = [
  { path: '', component: DataTableTestComponent },
  { path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableTestRoutingModule { }
