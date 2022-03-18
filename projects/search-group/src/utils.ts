import { ControlDate, ControlSelect, ControlText, SearchControl } from "./interfaces"

export const isText = (control: SearchControl): control is ControlText => {
  return control.type === 'text'
}

export const isSelect = (control: SearchControl): control is ControlSelect => {
  return control.type === 'select'
}

export const isDate = (control: SearchControl): control is ControlDate => {
  return control.type === 'date'
}


export const isPromise = <T>(value: any): value is Promise<T> => {
  if (value instanceof Promise && typeof value.then === 'function') {
    return true;
  }
  return false;
}
