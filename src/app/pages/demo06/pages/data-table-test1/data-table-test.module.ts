import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableTestRoutingModule } from './data-table-test-routing.module';
import { DataTableTestComponent } from './data-table-test.component';
import { DataTableModule } from 'projects/data-table/src/data-table.module';
import { PAGED_DATA_SERVICE } from 'data-table';
import { PageDataProvider } from './data-provider.service';


@NgModule({
  declarations: [
    DataTableTestComponent
  ],
  imports: [
    CommonModule,
    DataTableModule.forConfig({
      url: '',
      moduleName: '',
      searchConfig: [
        { label: 'SN', type: 'text', fieldName: 'test_schedule_id__unit_sn__icontains' },
        { label: 'Config', type: 'text', fieldName: 'test_schedule_id__config__icontains' },
        { label: 'RADAR_LINK', type: 'text', fieldName: 'test_schedule_id__radar_link__icontains' },
        { label: 'AllcocationDate', type: 'date', format: 'yyyy-MM-dd', fieldName: 'test_schedule_id__start_wf_date__icontains' },
      ]
    }),
    DataTableTestRoutingModule
  ],
  providers: [
    { provide: PAGED_DATA_SERVICE, useClass: PageDataProvider },
  ]
})
export class DataTableTestModule { }
