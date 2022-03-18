import { Component, OnInit, ChangeDetectionStrategy, Optional } from '@angular/core';
import { QueryParamsChange } from 'projects/data-table/src/services';
import { ControlBase } from './base';
import { ControlText } from './interfaces';

@Component({
  selector: 'app-control-text',
  templateUrl: './control-text.component.html',
  styleUrls: ['./control-text.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlTextComponent extends ControlBase<ControlText, string> implements OnInit {

  constructor(public queryParams: QueryParamsChange) {
    super(queryParams);
  }

  ngOnInit(): void {
  }

}
