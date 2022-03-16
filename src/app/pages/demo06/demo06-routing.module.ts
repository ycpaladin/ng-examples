import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Demo06Component } from './demo06.component';

const routes: Routes = [
  {
    path: '',
    component: Demo06Component,
    children: [
      { path: '1', loadChildren: () => import('./pages/data-table-test1/data-table-test.module').then(m => m.DataTableTestModule) },
      { path: '2', loadChildren: () => import('./pages/data-table-test2/data-table-test2.module').then(m => m.DataTableTest2Module) },
      {
        path: '**',
        redirectTo: '1',
        // matcher:
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo06RoutingModule { }
