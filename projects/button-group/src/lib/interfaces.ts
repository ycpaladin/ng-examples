import { IDataItem } from 'data-table';
import { Observable } from 'rxjs';
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


export interface IDeleteService {
  delete(id: number): void;
  refresh(): void;
}


export interface IDeleteDataItemProvider {
  deleteById(id: number): Observable<IDataItem | boolean>;
}
