// import { PlanetApplicationRef, BootstrapAppModule, BootstrapOptions } from './application/planet-application-ref';
import { IApplication } from './interfaces';
import { ApplicationLoader } from './application/application-loader';
import { PlanetApplicationService } from './planet-application.service';
import { isFunction } from './helpers';
import { ApplicationRef } from './application/application-ref';

declare const window: any;

export interface GlobalPlanet {
  apps: { [key: string]: ApplicationRef };
  portalApplication?: IApplication;
  applicationLoader: ApplicationLoader;
  applicationService: PlanetApplicationService;
}

export const globalPlanet: GlobalPlanet = (window.planet = window.planet || {
  apps: {}
});

// export function defineApplication(name: string, options: BootstrapAppModule | BootstrapOptions) {
//     if (globalPlanet.apps[name]) {
//         throw new Error(`${name} application has exist.`);
//     }
//     if (isFunction(options)) {
//         options = {
//             template: '',
//             bootstrap: options as BootstrapAppModule
//         };
//     }
//     const appRef = new PlanetApplicationRef(name, options as BootstrapOptions);
//     globalPlanet.apps[name] = appRef;
// }


// export function defineReactApplication(name: string, ) {
//     if (globalPlanet.apps[name]) {
//         throw new Error(`${name} application has exist.`);
//     }
//     // TODO。。。。
// }


export function getPlanetApplicationRef(appName: string): ApplicationRef | null {
  if (globalPlanet && globalPlanet.apps && globalPlanet.apps[appName]) {
    return globalPlanet.apps[appName];
  } else {
    return null;
  }
}

// export function setPortalApplicationData<T>(data: T) {
//     if (globalPlanet.portalApplication) {
//         globalPlanet.portalApplication.data = data;
//     }
// }

// export function getPortalApplicationData<TData>(): TData {
//     return globalPlanet.portalApplication?.data as TData;
// }

export function setApplicationLoader(loader: ApplicationLoader) {
  globalPlanet.applicationLoader = loader;
}

export function getApplicationLoader() {
  return globalPlanet.applicationLoader;
}

export function setApplicationService(service: PlanetApplicationService) {
  globalPlanet.applicationService = service;
}

export function getApplicationService() {
  return globalPlanet.applicationService;
}

export function clearGlobalPlanet() {
  window.planet.apps = {};
  window.planet.portalApplication = null;
  window.planet.applicationLoader = null;
  window.planet.applicationService = null;
}
