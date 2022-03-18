import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableTestRoutingModule } from './data-table-test-routing.module';
import { DataTableTestComponent } from './data-table-test.component';
import { DataTableModule } from 'projects/data-table/src/data-table.module';


@NgModule({
  declarations: [
    DataTableTestComponent
  ],
  imports: [
    CommonModule,
    DataTableModule.forConfig({
      url: '/lms/api/v1/test_task/tr_track/current_cp_tests?test_status=1&assume_user=admin&bitmap=1111111111',
      moduleName: '',
      searchConfig: [
        { label: 'SN', type: 'text', fieldName: 'test_schedule_id__unit_sn__icontains' },
        { label: 'Config', type: 'text', fieldName: 'test_schedule_id__config__icontains' },
        { label: 'RADAR_LINK', type: 'text', fieldName: 'test_schedule_id__radar_link__icontains' },
        { label: 'AllcocationDate', type: 'date', format: 'yyyy-MM-dd', fieldName: 'test_schedule_id__start_wf_date__icontains' },
      ]
    }),
    DataTableTestRoutingModule
  ]
})
export class DataTableTestModule { }
