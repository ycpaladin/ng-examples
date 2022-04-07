import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableTest2RoutingModule } from './data-table-test2-routing.module';
import { DataTableTest2Component } from './data-table-test2.component';
import { DataTableModule } from 'projects/data-table/src/data-table.module';
import { PAGED_DATA_SERVICE } from 'data-table';
import { PageDataProvider } from './data-provider.service';


@NgModule({
  declarations: [
    DataTableTest2Component
  ],
  imports: [
    CommonModule,
    DataTableModule,
    // DataTableModule.forConfig({
    //   url: '/lms/api/v1/test_task/data-report/test-allocation?assume_user=admin&bitmap=1111111111',
    //   moduleName: '',
    //   searchConfig: []
    // }),
    DataTableTest2RoutingModule
  ],
  providers: [
    { provide: PAGED_DATA_SERVICE, useClass: PageDataProvider },
  ]
})
export class DataTableTest2Module { }
