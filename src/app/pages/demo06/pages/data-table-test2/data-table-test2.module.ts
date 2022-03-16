import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableTest2RoutingModule } from './data-table-test2-routing.module';
import { DataTableTest2Component } from './data-table-test2.component';
import { DataTableModule } from '../../data-table';


@NgModule({
  declarations: [
    DataTableTest2Component
  ],
  imports: [
    CommonModule,
    DataTableModule.forConfig({
      url: '/lms/api/v1/test_task/data-report/test-allocation?assume_user=admin&bitmap=1111111111',
      moduleName: '',
      searchConfig: []
    }),
    DataTableTest2RoutingModule
  ]
})
export class DataTableTest2Module { }
