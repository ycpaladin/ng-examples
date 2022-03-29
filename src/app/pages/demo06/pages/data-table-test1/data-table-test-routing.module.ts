import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableTestComponent } from './data-table-test.component';
import { CreateComponent } from './create.component';
import { ViewComponent } from './view.component';
import { EditComponent } from './edit.component';

const routes: Routes = [
  { path: '', component: DataTableTestComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: ':id', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableTestRoutingModule { }
