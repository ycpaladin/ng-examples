import { NzTableModule } from 'ng-zorro-antd/table';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
// import { PageDataProvider } from './services';
import { MODULE_CONFIG, PAGED_DATA_SERVICE } from './consts';
import { DataTableModuleConfig } from './interfaces';
import { SearchGroupModule } from 'projects/search-group/src/search-group.module';



@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    SearchGroupModule
  ],
  exports: [
    DataTableComponent
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
