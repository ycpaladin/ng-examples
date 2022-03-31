import { Observable } from 'rxjs';
import { ComponentRef } from '../component/component-ref';
import { ComponentConfig, IApplication } from '../interfaces';

export type ComponentFactory = <TData, TComp>(componentName: string, config: ComponentConfig<TData>) => ComponentRef<TComp>;


export abstract class ApplicationRef {
  portalApp: IApplication;
  template: string;
  abstract get selector(): string;
  abstract navigateByUrl(url: string): void;
  abstract bootstrap(app: IApplication, rootElement: HTMLElement): Observable<ApplicationRef>;
  // abstract getComponentFactory(): ComponentFactory;
  // abstract registerComponentFactory(componentFactory: ComponentFactory): void;
  abstract destroy(): void
  abstract getCurrentRouterStateUrl(): string;

  abstract createRootElement(): HTMLElement;
}
