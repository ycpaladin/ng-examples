import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTreeTestRoutingModule } from './data-tree-test-routing.module';
import { DataTreeTestComponent } from './data-tree-test.component';
import { DataTreeModule } from 'projects/data-tree/src/data-tree.module';
import { TreeSelectOptionService } from './tree-select-option.service';
import { TreeDataProviderService } from './tree-data-provider.service';


@NgModule({
  declarations: [
    DataTreeTestComponent
  ],
  imports: [
    CommonModule,
    // DataTreeModule.forConfig({
    //   treeDataProvider: '/lms/api/v1/organization-management/tree',
    //   listDataProvider: '/lms/api/v1/organization-management/list',
    //   searchSelectOptionsProvider: TreeSelectOptionService,
    //   expandKeyRoute: {
    //     "empty": [0],
    //     "org-mgmt": [1],
    //     "dept-mgmt": [2, 3, 4]
    //   }
    // }),
    DataTreeModule.forConfig({
      treeDataProvider: TreeDataProviderService,
      listDataProvider: TreeDataProviderService,
      searchSelectOptionsProvider: TreeDataProviderService,
      expandKeyRoute: {
        "empty": [0],
        "org-mgmt": [1],
        "dept-mgmt": [2, 3, 4]
      }
    }),
    DataTreeTestRoutingModule
  ]
})
export class DataTreeTestModule { }
