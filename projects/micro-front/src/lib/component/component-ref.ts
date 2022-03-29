import { ComponentRef as _ComponentRef } from '@angular/core';

export class ComponentRef<TComp = any> {
  wrapperElement: HTMLElement;
  componentInstance: TComp;
  componentRef: _ComponentRef<TComp>;
  dispose: () => void;
}
