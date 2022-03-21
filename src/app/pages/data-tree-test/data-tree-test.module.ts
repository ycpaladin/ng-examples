import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTreeTestRoutingModule } from './data-tree-test-routing.module';
import { DataTreeTestComponent } from './data-tree-test.component';
import { DataTreeModule } from 'projects/data-tree/src/data-tree.module';
import { TreeSelectOptionService } from './tree-select-option.service';


@NgModule({
  declarations: [
    DataTreeTestComponent
  ],
  imports: [
    CommonModule,
    DataTreeModule.forConfig(
      {
        treeDataProvideApi: '/lms/api/v1/organization-management/tree',
        listDataProviderApi: '/lms/api/v1/organization-management/list',
        searchSelectOptions: TreeSelectOptionService
        //  [
        //   { label: '部门', value: { api: '/lms/api/v1/department-management/list', searchKey: 'search_global__icontains' } },
        //   { label: '组织', value: { api: '/lms/api/v1/organization-management/list', searchKey: 'search_global__icontains' } },
        // ]
      }
    ),
    DataTreeTestRoutingModule
  ]
})
export class DataTreeTestModule { }
