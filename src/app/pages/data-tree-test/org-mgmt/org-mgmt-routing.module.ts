import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgMgmtComponent } from './org-mgmt.component';

const routes: Routes = [{ path: ':id', component: OrgMgmtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgMgmtRoutingModule { }
