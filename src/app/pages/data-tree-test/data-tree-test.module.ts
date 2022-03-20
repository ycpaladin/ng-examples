import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTreeTestRoutingModule } from './data-tree-test-routing.module';
import { DataTreeTestComponent } from './data-tree-test.component';
import { DataTreeModule } from 'projects/data-tree/src/data-tree.module';


@NgModule({
  declarations: [
    DataTreeTestComponent
  ],
  imports: [
    CommonModule,
    DataTreeModule.forConfig(
      {
        dataProvideApi: '/lms/api/v1/organization-management/tree'
      }
    ),
    DataTreeTestRoutingModule
  ]
})
export class DataTreeTestModule { }
