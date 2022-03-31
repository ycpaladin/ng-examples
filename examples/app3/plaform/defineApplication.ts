import { ReactApplicationRef } from './react-application-ref';


export const globalPlanet: any = ((window as any).planet = (window as any).planet || {
  apps: {},
  applicationLoader: {}
});

export function defineApplication(name: string, config: any) {

  if (globalPlanet.apps[name]) {
    throw new Error(`${name} application has exist.`);
  }

  const appRef = new ReactApplicationRef(name, config);
  globalPlanet.apps[name] = appRef;

}
