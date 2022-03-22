import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeptMgmtRoutingModule } from './dept-mgmt-routing.module';
import { DeptMgmtComponent } from './dept-mgmt.component';


@NgModule({
  declarations: [
    DeptMgmtComponent
  ],
  imports: [
    CommonModule,
    DeptMgmtRoutingModule
  ]
})
export class DeptMgmtModule { }
