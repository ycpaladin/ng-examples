import { TemplateRef } from '@angular/core';
// import { Observable } from 'rxjs';

import { EventEmitter } from "@angular/core";

export interface IButton {
  buttonText: string;
  buttonDisabled: boolean;
  buttonType: string;
  click: EventEmitter<void>;
  template: TemplateRef<any>;
}

export interface IButtonContent {
  template: TemplateRef<any>;
}


export interface IDataContext<T> {
  data: T;
}
