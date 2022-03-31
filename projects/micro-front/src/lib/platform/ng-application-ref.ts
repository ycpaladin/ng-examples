import { ComponentRef } from './../component/component-ref';
import { NgModuleRef, NgZone } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { from, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { createElementByTemplate, getTagNameByTemplate } from "../helpers";
import { IApplication, ComponentConfig } from "../interfaces";
import { ApplicationRef, ComponentFactory } from "../application/application-ref";
import { getPlanetApplicationRef } from '../global-planet';

export interface BootstrapOptions {
  template: string;
  bootstrap: BootstrapAppModule;
}

export type BootstrapAppModule = (portalApp: IApplication) => Promise<NgModuleRef<any> | undefined | null>;

export type PlantComponentFactory = <TData, TComp>(
  componentName: string,
  config: ComponentConfig<TData>
) => ComponentRef<TComp>;


export class NgApplicationRef extends ApplicationRef {

  public appModuleRef?: NgModuleRef<any>;
  public template: string;
  private innerSelector?: string;
  private name: string;
  portalApp!: IApplication;
  private appModuleBootstrap?: BootstrapAppModule;
  private componentFactory?: ComponentFactory;

  public get selector() {
    return this.innerSelector;
  }

  public get bootstrapped() {
    return !!this.appModuleRef;
  }

  public get ngZone(): NgZone | undefined {
    return this.appModuleRef?.injector.get(NgZone);
  }

  // public get sandbox(): Sandbox {
  //     return getSandboxInstance();
  // }

  constructor(name: string, options?: BootstrapOptions) {
    super();
    this.name = name;
    if (options) {
      this.template = options.template;
      this.innerSelector = this.template ? getTagNameByTemplate(this.template) : '';
      this.appModuleBootstrap = options.bootstrap;
    }
    // This is a hack, since NgZone doesn't allow you to configure the property that identifies your zone.
    // See https://github.com/PlaceMe-SAS/single-spa-angular-cli/issues/33,
    NgZone.isInAngularZone = () => {
      // @ts-ignore
      return window.Zone.current._properties[`ngx-planet-${name}`] === true;
    };
  }

  createRootElement(): HTMLElement {
    const appRef = getPlanetApplicationRef(this.name);
    return createElementByTemplate(appRef.template);
  }

  // 子应用路由变化后同步修改 portal 的 Route
  private syncPortalRouteWhenNavigationEnd() {
    const router = this.appModuleRef?.injector.get(Router);
    if (router) {
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.ngZone?.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
              this.portalApp.navigateByUrl(event.url);
            });
        }
      });
    }
  }

  bootstrap(app: IApplication): Observable<ApplicationRef> {
    if (!this.appModuleBootstrap) {
      throw new Error(`app(${this.name}) is not defined`);
    }
    this.portalApp = app;
    return from(
      this.appModuleBootstrap(app).then(appModuleRef => {
        this.appModuleRef = appModuleRef!;
        this.appModuleRef.instance.appName = this.name;
        this.syncPortalRouteWhenNavigationEnd();
        return this;
      })
    );
  }

  getRouter() {
    return this.appModuleRef?.injector.get(Router);
  }

  getCurrentRouterStateUrl() {
    return this.getRouter()?.routerState.snapshot.url;
  }

  navigateByUrl(url: string): void {
    const router = this.getRouter();
    this.ngZone?.run(() => {
      router?.navigateByUrl(url);
    });
  }

  getComponentFactory() {
    return this.componentFactory;
  }

  registerComponentFactory(componentFactory: ComponentFactory) {
    this.componentFactory = componentFactory;
  }

  destroy(): void {
    if (this.appModuleRef) {
      const router = this.appModuleRef.injector.get(Router);
      if (router) {
        router.dispose();
      }
      // if (this.sandbox) {
      //   this.sandbox.destroy();
      // }
      this.appModuleRef.destroy();
      this.appModuleRef = undefined;
    }
  }

}
