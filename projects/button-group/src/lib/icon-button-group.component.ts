import { Component, OnInit, ChangeDetectionStrategy, forwardRef, QueryList, Inject, Optional, SkipSelf, Input, ContentChild, ContentChildren } from '@angular/core';
import { IDataItem } from 'core';
import { ButtonGroupBase } from './base';
import { IButton, IDataContext } from './interfaces';
import { ICON_BUTTON, DATA_CONTEXT } from './token';
import { DeleteService } from './services';

@Component({
  selector: 'lib-icon-button-group',
  templateUrl: './icon-button-group.component.html',
  styleUrls: ['./icon-button-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: ButtonGroupBase, useExisting: forwardRef(() => IconButtonGroupComponent) },
    { provide: DATA_CONTEXT, useExisting: forwardRef(() => IconButtonGroupComponent) },
    DeleteService // TODO？放在这里似乎不太合适
  ]
})
export class IconButtonGroupComponent extends ButtonGroupBase implements OnInit, IDataContext<IDataItem> {
  @Input() max: number = 3;
  @Input() data: IDataItem;
  @ContentChildren(ICON_BUTTON, { descendants: true }) listOfButton: QueryList<IButton>;

  // TODO...
  // 按钮禁用显示策略，1. 默认为灰色，2.不显示
  constructor(@Inject(ButtonGroupBase) @Optional() @SkipSelf() public parent: ButtonGroupBase) {
    super();
  }

  ngOnInit(): void {
  }

}
