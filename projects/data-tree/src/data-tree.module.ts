import { TreeDataProvider, TreeDataProviderInner } from './services';
import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { DataTreeComponent } from './data-tree.component';
import { DataTreeLayoutComponent } from './data-tree-layout.component';
import { DataTreeSearchComponent } from './data-tree-search.component';
import { TreeModuleConfig } from './interfaces';
import { TREE_CONFIG } from './token';



@NgModule({
  declarations: [
    DataTreeComponent,
    DataTreeLayoutComponent,
    DataTreeSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzBreadCrumbModule,
    NzTreeModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzGridModule,
    NzMenuModule,
    NzModalModule,
    NzListModule,
    NzCardModule,
  ],
  exports: [
    DataTreeComponent,
    DataTreeLayoutComponent,
    DataTreeSearchComponent
  ]
})
export class DataTreeModule {
  static forConfig(config?: TreeModuleConfig): ModuleWithProviders<DataTreeModule> {
    const _providers = [] as Provider[];
    if (config && config.dataProvideApi) {
      _providers.push(
        TreeDataProviderInner,
        { provide: TreeDataProvider, useExisting: TreeDataProviderInner }
      )
    }
    return {
      ngModule: DataTreeModule,
      providers: [
        { provide: TREE_CONFIG, useValue: config },
        _providers
      ]
    }
  }
}
