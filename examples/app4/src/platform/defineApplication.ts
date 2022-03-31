
import { of } from 'rxjs'

export interface DefineApplicationConfig {
  selector: string;
  bootstrap: (app: any, element: HTMLElement, extra: any) => void;
}


export class VueApplication {
  constructor(public name: string, public config: DefineApplicationConfig) {

  }

  createRootElement(): HTMLElement {
    const element = document.createElement(this.selector);
    return element;
  }
  /**
   *  TODO 同步路由
   */
  private syncPortalRouteWhenNavigationEnd() {
    //   const router = this.appModuleRef?.injector.get(Router);
    //   if (router) {
    //     router.events.subscribe(event => {
    //       if (event instanceof NavigationEnd) {
    //         this.ngZone?.onStable
    //           .asObservable()
    //           .pipe(take(1))
    //           .subscribe(() => {
    //             this.portalApp.navigateByUrl(event.url);
    //           });
    //       }
    //     });
    //   }
    // this.portalApp.navigateByUrl()
  }


  get selector(): string {
    return this.config.selector;
  }
  navigateByUrl(url: string): void {
    console.log('navigateByUrl', url)
  }
  bootstrap(app: any, appRootElement: HTMLElement): any {
    this.config.bootstrap(app, appRootElement, {})
    this.syncPortalRouteWhenNavigationEnd();
    return of(this);
  }
  // getComponentFactory(): ComponentFactory {
  //   throw new Error("Method not implemented.");
  // }
  // registerComponentFactory(componentFactory: ComponentFactory): void {
  //   throw new Error("Method not implemented.");
  // }
  destroy(): void {
    console.log('destroy')
  }
  getCurrentRouterStateUrl(): string {
    throw new Error("Method not implemented.");
  }
}

export const globalPlanet: any = ((window as any).planet = (window as any).planet || {
  apps: {},
  applicationLoader: {}
});

export function defineApplication(name: string, config: DefineApplicationConfig) {
  if (globalPlanet.apps[name]) {
    throw new Error(`${name} application has exist.`);
  }

  const appRef = new VueApplication(name, config);
  globalPlanet.apps[name] = appRef;
}


