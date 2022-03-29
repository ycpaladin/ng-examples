import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet'
import { SearchGroupModule } from 'search-group';

import { DataTableComponent } from './data-table.component';
import { MODULE_CONFIG } from './token';
import { DataTableModuleConfig } from './interfaces';
import { DataTableColumnDirective, DataTableColumnContentDirective, DateColumnComponent } from './data-table-column.directive';



@NgModule({
  declarations: [
    DataTableComponent,
    DataTableColumnDirective,
    DataTableColumnContentDirective,
    DateColumnComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzOutletModule,
    SearchGroupModule
  ],
  exports: [
    DataTableComponent,
    DataTableColumnDirective,
    DataTableColumnContentDirective,
    DateColumnComponent
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
