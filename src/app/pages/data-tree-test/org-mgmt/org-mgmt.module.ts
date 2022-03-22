import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgMgmtRoutingModule } from './org-mgmt-routing.module';
import { OrgMgmtComponent } from './org-mgmt.component';


@NgModule({
  declarations: [
    OrgMgmtComponent
  ],
  imports: [
    CommonModule,
    OrgMgmtRoutingModule
  ]
})
export class OrgMgmtModule { }
