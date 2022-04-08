import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet'
import { NzModalModule } from 'ng-zorro-antd/modal';

import { DataTableComponent } from './data-table.component';
import { MODULE_CONFIG } from './token';
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
import { DisabledByPipe } from './disabled-by.pipe';



@NgModule({
  declarations: [
    DisabledByPipe,
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
}
