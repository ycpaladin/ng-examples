import { QueryParamsChange } from 'projects/data-table/src/services';
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


  constructor(@Optional() public queryParams: QueryParamsChange) {
    super(queryParams);
  }

  ngOnInit(): void {
  }

}



