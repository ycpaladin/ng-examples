import { QueryParams } from 'projects/data-table/src/services';
import { Component, OnInit, ChangeDetectionStrategy, Optional } from '@angular/core';
import { ControlBase } from './base';
import { ControlSelect } from './interfaces';

@Component({
  selector: 'app-control-select',
  templateUrl: './control-select.component.html',
  styleUrls: ['./control-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlSelectComponent extends ControlBase<ControlSelect, string> implements OnInit {


  constructor(@Optional() public queryParams: QueryParams) {
    super(queryParams);
  }

  ngOnInit(): void {
  }

}



