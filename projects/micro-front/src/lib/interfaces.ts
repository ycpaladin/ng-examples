import { ElementRef } from '@angular/core';


export interface IApplication {
  navigateByUrl(url: string, extras?: any): Promise<boolean>;
}


export interface Component<T = any> {
  name: string;
  type: T;
}


export interface ComponentConfig<T = any> {
  container: HTMLElement | ElementRef<HTMLElement>;
  wrapperClass?: string;
  data?: T;
}
