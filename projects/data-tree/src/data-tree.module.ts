import { isObservable } from 'rxjs';
import { ListDataProvider, TreeDataProvider, TreeDataProviderInner, ListDataProviderInner } from './services';
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
import { DataListComponent } from './data-list.component';
import { SearchSelectOptionProvider, TreeModuleConfig } from './interfaces';
import { SEARCH_CATEGORY, TREE_CONFIG } from './token';
import { BreadcrumbUrlPipe } from './breadcrumb-url.pipe';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    DataTreeComponent,
    DataTreeLayoutComponent,
    DataTreeSearchComponent,
    DataListComponent,
    BreadcrumbUrlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    const { treeDataProvider, listDataProvider, searchSelectOptionsProvider } = config || {};
    if (treeDataProvider) {
      if (typeof treeDataProvider === 'string') {
        _providers.push(
          TreeDataProviderInner,
          { provide: TreeDataProvider, useExisting: TreeDataProviderInner }
        );
      } else {
        _providers.push(
          treeDataProvider,
          { provide: TreeDataProvider, useExisting: treeDataProvider }
        )
      }
    }

    if (listDataProvider) {
      if (typeof listDataProvider === 'string') {
        _providers.push(
          ListDataProviderInner,
          { provide: ListDataProvider, useExisting: ListDataProviderInner }
        );
      } else {
        _providers.push(
          listDataProvider,
          { provide: ListDataProvider, useExisting: listDataProvider }
        )
      }
    }

    if (searchSelectOptionsProvider) {
      if (Array.isArray(searchSelectOptionsProvider) || isObservable(searchSelectOptionsProvider)) {
        _providers.push(
          { provide: SEARCH_CATEGORY, useValue: config.searchSelectOptionsProvider }
        );
      } else {
        _providers.push(
          searchSelectOptionsProvider,
          {
            provide: SEARCH_CATEGORY,
            useFactory(source: SearchSelectOptionProvider) {
              return source.getOptions();
            }, deps: [searchSelectOptionsProvider]
          }
        )
      }
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
