import { Component, OnInit, ChangeDetectionStrategy, forwardRef, QueryList, Inject, Optional, SkipSelf, Input, ContentChild, ContentChildren } from '@angular/core';
import { ButtonGroupBase } from './base';
import { IButton } from './interfaces';
import { ICON_BUTTON } from './token';

@Component({
  selector: 'lib-icon-button-group',
  templateUrl: './icon-button-group.component.html',
  styleUrls: ['./icon-button-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ButtonGroupBase, useExisting: forwardRef(() => IconButtonGroupComponent) }]
})
export class IconButtonGroupComponent extends ButtonGroupBase implements OnInit {
  @Input() max: number = 3;
  @ContentChildren(ICON_BUTTON, { descendants: true }) listOfButton: QueryList<IButton>;

  constructor(@Inject(ButtonGroupBase) @Optional() @SkipSelf() public parent: ButtonGroupBase) {
    super();
  }

  ngOnInit(): void {
  }

}
