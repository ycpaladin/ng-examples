import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTreeTestComponent } from './data-tree-test.component';

const routes: Routes = [
  {
    path: '',
    component: DataTreeTestComponent,
    children: [
      { path: 'org-mgmt', loadChildren: () => import('./org-mgmt/org-mgmt.module').then(m => m.OrgMgmtModule) },
      { path: 'dept-mgmt', loadChildren: () => import('./dept-mgmt/dept-mgmt.module').then(m => m.DeptMgmtModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTreeTestRoutingModule { }
