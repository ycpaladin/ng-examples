import { BootstrapAppModule, BootstrapOptions, NgApplicationRef } from './ng-application-ref';
import { globalPlanet, getApplicationLoader, setApplicationLoader } from "../global-planet";
import { isFunction } from "../helpers";

export function defineApplication(name: string, options: BootstrapAppModule | BootstrapOptions) {
  const loadKey = 'ng';
  if (globalPlanet.apps[name]) {
    throw new Error(`${name} application has exist.`);
  }
  if (isFunction(options)) {
    options = {
      template: '',
      bootstrap: options as BootstrapAppModule
    };
  }
  const appRef = new NgApplicationRef(name, options as BootstrapOptions);
  globalPlanet.apps[name] = appRef;
}
