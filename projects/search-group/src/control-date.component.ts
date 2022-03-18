import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { format } from 'date-fns';
import { QueryParams } from 'projects/data-table/src/services';
import { ControlBase } from './base';
import { ControlDate } from './interfaces';

@Component({
  selector: 'app-control-date',
  templateUrl: './control-date.component.html',
  styleUrls: ['./control-date.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlDateComponent extends ControlBase<ControlDate, Date> implements OnInit {



  override onNgModelChange(next: Date): void {
    const value = format(next, this.item.format);
    super.onNgModelChange(value as any);
  }

  constructor(public queryParams: QueryParams) {
    super(queryParams);
  }

  ngOnInit(): void {
  }

}
