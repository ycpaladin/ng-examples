import { Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, from, Observable, of, Subject } from "rxjs";
import { catchError, filter, map, share, switchMap, take, tap } from "rxjs/operators";
import { ApplicationLoader } from "../application/application-loader";
import { ApplicationRef } from "../application/application-ref";
import { AssetsLoader } from "../assets-loader";
import { getPlanetApplicationRef } from "../global-planet";
import { coerceArray, createElementByTemplate, getHTMLElement } from "../helpers";
import { PlanetApplicationService } from "../planet-application.service";
import { PlanetApplication, PlanetOptions, PlanetRouterEvent, SwitchModes } from "../planet.class";
import { NgApplication } from "./ng-application";

export interface AppStatusChangeEvent {
  app: PlanetApplication;
  status: ApplicationStatus;
}

export enum ApplicationStatus {
  assetsLoading = 1,
  assetsLoaded = 2,
  bootstrapping = 3,
  bootstrapped = 4,
  active = 5,
  loadError = 10
}

export interface AppsLoadingStartEvent {
  shouldLoadApps: PlanetApplication[];
  shouldUnloadApps: PlanetApplication[];
}


export class NgApplicationLoader extends ApplicationLoader {
  private firstLoad = true;

  private startRouteChangeEvent!: PlanetRouterEvent;

  private options: PlanetOptions;

  private inProgressAppAssetsLoads = new Map<string, Observable<PlanetApplication>>();

  private appsStatus = new Map<PlanetApplication, ApplicationStatus>();

  private portalApp = new NgApplication();

  private routeChange$ = new Subject<PlanetRouterEvent>();

  private appStatusChange$ = new Subject<AppStatusChangeEvent>();

  private appsLoadingStart$ = new Subject<AppsLoadingStartEvent>();
  get loadingDone(): boolean {
    throw new Error("Method not implemented.");
  }
  get appStatusChange(): Observable<any> {
    throw new Error("Method not implemented.");
  }
  get appsLoadingStart(): Observable<any> {
    throw new Error("Method not implemented.");
  }
  reroute(url: string): void {
    throw new Error("Method not implemented.");
  }
  preload(app: PlanetApplication, immediate?: boolean): Observable<ApplicationRef> {
    return this.preloadInternal(app, immediate);
  }


  private setAppStatus(app: PlanetApplication, status: ApplicationStatus) {
    this.ngZone.run(() => {
      const fromStatus = this.appsStatus.get(app);
      // debug(
      //   `app(${app.name}) status change: ${fromStatus ? ApplicationStatus[fromStatus] : 'empty'} => ${ApplicationStatus[status]
      //   }`
      // );
      this.appsStatus.set(app, status);
      this.appStatusChange$.next({
        app: app,
        status: status
      });
    });
  }

  private getAppStatusChange$(
    app: PlanetApplication,
    status = ApplicationStatus.bootstrapped
  ): Observable<PlanetApplication> {
    return this.appStatusChange.pipe(
      filter(event => {
        return event.app === app && event.status === status;
      }),
      map(() => {
        return app;
      })
    );
  }

  private switchModeIsCoexist(app: PlanetApplication) {
    if (app && app.switchMode) {
      return app.switchMode === SwitchModes.coexist;
    } else {
      return this.options.switchMode === SwitchModes.coexist;
    }
  }

  private errorHandler(error: Error) {
    this.ngZone.run(() => {
      this.options.errorHandler(error);
    });
  }


  private startLoadAppAssets(app: PlanetApplication): Observable<PlanetApplication> {
    if (this.inProgressAppAssetsLoads.get(app.name)) {
      return this.inProgressAppAssetsLoads.get(app.name);
    } else {
      const loadApp$ = this.assetsLoader.loadAppAssets(app).pipe(
        tap(() => {
          this.inProgressAppAssetsLoads.delete(app.name);
          this.setAppStatus(app, ApplicationStatus.assetsLoaded);
        }),
        map(() => {
          return app;
        }),
        catchError(error => {
          this.inProgressAppAssetsLoads.delete(app.name);
          this.setAppStatus(app, ApplicationStatus.loadError);
          throw error;
        }),
        share()
      );
      this.inProgressAppAssetsLoads.set(app.name, loadApp$);
      this.setAppStatus(app, ApplicationStatus.assetsLoading);
      return loadApp$;
    }
  }

  private hideApp(planetApp: PlanetApplication) {
    const appRef = getPlanetApplicationRef(planetApp.name);
    const appRootElement = document.querySelector(appRef?.selector || (planetApp.selector as string));
    if (appRootElement) {
      appRootElement.setAttribute('style', 'display:none;');
    }
  }

  private showApp(planetApp: PlanetApplication) {
    const appRef = getPlanetApplicationRef(planetApp.name);
    const appRootElement = document.querySelector(appRef?.selector || (planetApp.selector as string));
    if (appRootElement) {
      appRootElement.setAttribute('style', '');
    }
  }

  private destroyApp(planetApp: PlanetApplication) {
    const appRef = getPlanetApplicationRef(planetApp.name);
    if (appRef) {
      appRef.destroy();
    }
    const container = getHTMLElement(planetApp.hostParent);
    const appRootElement = container?.querySelector((appRef && appRef.selector) || (planetApp.selector as string));
    if (appRootElement) {
      container?.removeChild(appRootElement);
    }
  }

  private bootstrapApp(
    app: PlanetApplication,
    defaultStatus: 'hidden' | 'display' = 'display'
  ): Observable<ApplicationRef> {
    // debug(`app(${app.name}) start bootstrapping`);
    this.setAppStatus(app, ApplicationStatus.bootstrapping);
    const appRef = getPlanetApplicationRef(app.name);
    if (appRef && appRef.bootstrap) {
      const container = getHTMLElement(app.hostParent);
      let appRootElement: HTMLElement;
      if (container) {
        appRootElement = container.querySelector(appRef.selector || app.selector!)!;
        if (!appRootElement) {
          if (appRef.template) {
            appRootElement = createElementByTemplate(appRef.template)!;
          } else {
            appRootElement = document.createElement(app.selector!);
          }
          appRootElement.setAttribute('style', 'display:none;');
          if (app.hostClass) {
            appRootElement.classList.add(...coerceArray(app.hostClass));
          }
          if (app.stylePrefix) {
            appRootElement.classList.add(...coerceArray(app.stylePrefix));
          }
          container.appendChild(appRootElement);
        }
      }
      let result = appRef.bootstrap(this.portalApp);
      // Backwards compatibility promise for bootstrap
      if ((result as any)['then']) {
        result = from(result) as Observable<ApplicationRef>;
      }
      return result.pipe(
        tap(() => {
          // debug(`app(${app.name}) bootstrapped success for ${defaultStatus}`);
          this.setAppStatus(app, ApplicationStatus.bootstrapped);
          if (defaultStatus === 'display' && appRootElement) {
            appRootElement.removeAttribute('style');
          }
        }),
        map(() => {
          return appRef;
        })
      );
    } else {
      throw new Error(
        `[${app.name}] not found, make sure that the app has the correct name defined use defineApplication(${app.name}) and runtimeChunk and vendorChunk are set to true, details see https://github.com/worktile/ngx-planet#throw-error-cannot-read-property-call-of-undefined-at-__webpack_require__-bootstrap79`
      );
    }
  }

  private getUnloadApps(activeApps: PlanetApplication[]) {
    const unloadApps: PlanetApplication[] = [];
    this.appsStatus.forEach((value, app) => {
      if (value === ApplicationStatus.active && !activeApps.find(item => item.name === app.name)) {
        unloadApps.push(app);
      }
    });
    return unloadApps;
  }

  private unloadApps(shouldUnloadApps: PlanetApplication[], event: PlanetRouterEvent) {
    const hideApps: PlanetApplication[] = [];
    const destroyApps: PlanetApplication[] = [];
    shouldUnloadApps.forEach(app => {
      if (this.switchModeIsCoexist(app)) {
        // debug(`hide app(${app.name}) for coexist mode`);
        hideApps.push(app);
        this.hideApp(app);
        this.setAppStatus(app, ApplicationStatus.bootstrapped);
      } else {
        destroyApps.push(app);
        // 销毁之前先隐藏，否则会出现闪烁，因为 destroy 是延迟执行的
        // 如果销毁不延迟执行，会出现切换到主应用的时候会有视图卡顿现象
        this.hideApp(app);
        this.setAppStatus(app, ApplicationStatus.assetsLoaded);
      }
    });

    if (hideApps.length > 0 || destroyApps.length > 0) {
      // 从其他应用切换到主应用的时候会有视图卡顿现象，所以先等主应用渲染完毕后再加载其他应用
      // 此处尝试使用 this.ngZone.onStable.pipe(take(1)) 应用之间的切换会出现闪烁
      setTimeout(() => {
        hideApps.forEach(app => {
          const appRef = getPlanetApplicationRef(app.name);
          if (appRef) {
            appRef.navigateByUrl(event.url);
          }
        });
        destroyApps.forEach(app => {
          // debug(`destroy app(${app.name})`);
          this.destroyApp(app);
        });
      });
    }
  }

  private preloadApps(activeApps?: PlanetApplication[]) {
    setTimeout(() => {
      const toPreloadApps = this.planetApplicationService.getAppsToPreload(
        activeApps ? activeApps.map(item => item.name) : undefined
      );
      // debug(`start preload apps: ${this.getAppNames(toPreloadApps)}`);
      const loadApps$ = toPreloadApps.map(preloadApp => {
        return this.preloadInternal(preloadApp);
      });

      forkJoin(loadApps$).subscribe({
        error: error => {
          this.errorHandler(error);
        }
      });
    });
  }

  private ensurePreloadApps(activeApps?: PlanetApplication[]) {
    // Start preload apps
    // Start preload when first time app loaded
    if (this.firstLoad) {
      this.preloadApps(activeApps);
      this.firstLoad = false;
    }
  }

  private preloadInternal(app: PlanetApplication, immediate?: boolean): Observable<ApplicationRef | null> {
    const status = this.appsStatus.get(app);
    if (!status || status === ApplicationStatus.loadError) {
      // debug(`preload app(${app.name}), status is empty, start to load assets`);
      return this.startLoadAppAssets(app).pipe(
        switchMap(() => {
          // debug(`preload app(${app.name}), assets loaded, start bootstrap app, immediate: ${!!immediate}`);
          if (immediate) {
            return this.bootstrapApp(app, 'hidden');
          } else {
            return this.ngZone.runOutsideAngular(() => {
              return this.bootstrapApp(app, 'hidden');
            });
          }
        }),
        catchError(error => {
          this.errorHandler(error);
          return of(null);
        }),
        map(() => {
          return getPlanetApplicationRef(app.name);
        })
      );
    } else if (
      [ApplicationStatus.assetsLoading, ApplicationStatus.assetsLoaded, ApplicationStatus.bootstrapping].includes(
        status
      )
    ) {
      // debug(`preload app(${app.name}), status is ${ApplicationStatus[status]}, return until bootstrapped`);
      return this.getAppStatusChange$(app).pipe(
        take(1),
        map(() => {
          return getPlanetApplicationRef(app.name);
        })
      );
    } else {
      const appRef = getPlanetApplicationRef(app.name);
      if (!appRef) {
        throw new Error(`${app.name}'s status is ${ApplicationStatus[status]}, planetApplicationRef is null.`);
      }
      return of(appRef);
    }
  }



  constructor(
    private assetsLoader: AssetsLoader,
    private planetApplicationService: PlanetApplicationService,
    private ngZone: NgZone,
    router: Router,
    injector: Injector,
    applicationRef: ApplicationRef
  ) {
    super();
  }

}
