import { Observable } from 'rxjs';

export type ControlType = 'text' | 'select' | 'date';

export interface Control<T = ControlType, V = any> {
  type: T;
  label: string;
  fieldName: string;
  visable?: boolean;
  disabled?: boolean;
  defaultValue?: V;
}

export type ControlText = Control<'text', string>;

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export type SelectOptionType = SelectOption[] | Promise<SelectOption[]> | Observable<SelectOption[]>;
export interface ControlSelect extends Control<'select', string> {
  options: SelectOptionType;
}

export interface ControlDate extends Control<'date', string | Date> {
  format: string;
}

export type SearchControl = ControlText | ControlSelect | ControlDate;

export type SearchGroupConfig = SearchControl[];
