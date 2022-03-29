import { Component, OnInit, ContentChildren, QueryList, Input, forwardRef, Inject, Optional, SkipSelf } from '@angular/core';
import { ButtonGroupBase } from './base';
import { IButton } from './interfaces';
import { BUTTON } from './token';

@Component({
  selector: 'lib-button-group',
  templateUrl: './button-group.component.html',
  providers: [{ provide: ButtonGroupBase, useExisting: forwardRef(() => ButtonGroupComponent) }]
})
export class ButtonGroupComponent extends ButtonGroupBase implements OnInit {

  @Input() max: number = 4;
  @ContentChildren(BUTTON, { descendants: true }) listOfButton: QueryList<IButton>;

  constructor(@Inject(ButtonGroupBase) @Optional() @SkipSelf() public parent: ButtonGroupBase) {
    super();
  }

  ngOnInit(): void {
  }

}
