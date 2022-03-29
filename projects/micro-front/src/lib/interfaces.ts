

export interface IApplication {
  navigateByUrl(url: string, extras?: any): Promise<boolean>;
}


export interface Component<T = any> {
  name: string;
  type: T;
}


export interface ComponentConfig {
  container: HTMLElement;
  wrapperClass?: string;
  data?: { [K: string]: any };
}
