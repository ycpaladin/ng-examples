import { Directive, EventEmitter, Input, Output, forwardRef, TemplateRef, ContentChild, Inject } from '@angular/core';
import { IDataItem } from 'core';

import { IButton, IButtonContent, IDataContext } from './interfaces';
import { BUTTON, BUTTON_CONTENT, DATA_CONTEXT, ICON_BUTTON } from './token';

@Directive({
  selector: 'lib-button',
  providers: [{ provide: BUTTON, useExisting: forwardRef(() => ButtonDirective) }]
})
export class ButtonDirective implements IButton {

  @Input() buttonText: string;
  @Input() buttonDisabled: boolean;
  @Input() buttonType: 'primary' = 'primary';

  @Output() click = new EventEmitter<void>();
  @ContentChild(BUTTON_CONTENT, { read: TemplateRef, static: true }) template: TemplateRef<any>;

  constructor() { }

}

@Directive({
  selector: 'lib-icon-button',
  providers: [{ provide: ICON_BUTTON, useExisting: forwardRef(() => IconButtonDirective) }]
})
export class IconButtonDirective implements IButton {

  buttonText: string;
  @Input() buttonDisabled: boolean;
  @Input() buttonType: string;

  @Output() click = new EventEmitter<void>();
  @ContentChild(BUTTON_CONTENT, { read: TemplateRef, static: true }) template: TemplateRef<any>;

  constructor(@Inject(DATA_CONTEXT) public dataContext: IDataContext<IDataItem>) { }

}



@Directive({
  selector: '[libButtonContent],[libIconButtonContent]',
  providers: [{ provide: BUTTON_CONTENT, useExisting: forwardRef(() => ButtonContentDirective) }]
})
export class ButtonContentDirective implements IButtonContent {

  constructor(public template: TemplateRef<any>) { }

}
