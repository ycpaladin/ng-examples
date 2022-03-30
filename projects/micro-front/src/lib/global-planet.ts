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
  applicationLoader: {
    [K: string]: ApplicationLoader
  };
  applicationService: PlanetApplicationService;
}

export const globalPlanet: GlobalPlanet = (window.planet = window.planet || {
  apps: {},
  applicationLoader: {}
});


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

export function setApplicationLoader(key: string, loader: ApplicationLoader) {
  globalPlanet.applicationLoader[key] = loader;
}

export function getApplicationLoader(key: string) {
  return globalPlanet.applicationLoader[key];
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
  window.planet.applicationLoader = {};
  window.planet.applicationService = null;
}
