
import { of } from 'rxjs'

// export interface DefineApplicationConfig {
//   selector: string;
//   bootstrap: (app: any, element: HTMLElement, extra: any) => void;
// }


export class VueApplication {
  constructor(name, config) {
    this.name = name;
    this.config = config;
  }

  createRootElement() {
    const element = document.createElement(this.selector);
    const container = document.createElement('div')
    element.appendChild(container)
    return element;
  }
  /**
   *  TODO 同步路由
   */
  syncPortalRouteWhenNavigationEnd() {
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


  get selector() {
    return this.config.selector;
  }
  navigateByUrl(url) {
    console.log('navigateByUrl', url)
  }
  bootstrap(app, appRootElement) {
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
  destroy() {
    console.log('destroy')
  }
  getCurrentRouterStateUrl() {
    throw new Error("Method not implemented.");
  }
}

export const globalPlanet = ((window).planet = (window).planet || {
  apps: {},
  applicationLoader: {}
});

export function defineApplication(name, config) {
  if (globalPlanet.apps[name]) {
    throw new Error(`${name} application has exist.`);
  }

  const appRef = new VueApplication(name, config);
  globalPlanet.apps[name] = appRef;
}


