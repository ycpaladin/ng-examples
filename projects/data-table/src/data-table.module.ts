import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet'
import { NzModalModule } from 'ng-zorro-antd/modal';

import { DataTableComponent } from './data-table.component';
import { MODULE_CONFIG } from './token';
import { DataTableModuleConfig } from './interfaces';
import {
  DataTableColumnDirective,
  DataTableColumnContentDirective,
  DateColumnComponent,
  LinkViewColumnComponent,
  OpenModalColumnComponent,
  DataTableModalColumnTitleDirective,
  DataTableModalColumnContentDirective,
  DataTableModalColumnFooterDirective
} from './data-table-column.directive';



@NgModule({
  declarations: [
    DataTableComponent,
    DataTableColumnDirective,
    DataTableColumnContentDirective,
    DateColumnComponent,
    LinkViewColumnComponent,
    OpenModalColumnComponent,
    DataTableModalColumnTitleDirective,
    DataTableModalColumnContentDirective,
    DataTableModalColumnFooterDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule,
    NzOutletModule,
    NzModalModule,
  ],
  exports: [
    DataTableComponent,
    DataTableColumnDirective,
    DataTableColumnContentDirective,
    DateColumnComponent,
    LinkViewColumnComponent,
    OpenModalColumnComponent,
    DataTableModalColumnTitleDirective,
    DataTableModalColumnContentDirective,
    DataTableModalColumnFooterDirective
  ]
})
export class DataTableModule {
  static forConfig(config: DataTableModuleConfig): ModuleWithProviders<DataTableModule> {
    return {
      ngModule: DataTableModule,
      providers: [
        // 配置在此处会缓存查询条件
        { provide: MODULE_CONFIG, useValue: config },
        // { provide: PAGED_DATA_SERVICE, useClass: PageDataProvider }
      ]
    }
  }
}
