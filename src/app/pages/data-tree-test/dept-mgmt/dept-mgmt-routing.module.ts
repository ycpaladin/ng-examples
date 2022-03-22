import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeptMgmtComponent } from './dept-mgmt.component';

const routes: Routes = [{ path: '', component: DeptMgmtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptMgmtRoutingModule { }
