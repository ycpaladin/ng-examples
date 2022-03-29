import { DOCUMENT } from "@angular/common";
import { ApplicationRef, NgModuleRef, NgZone, Inject, ElementRef } from "@angular/core";
import { Observable, of, timer } from "rxjs";
import { map, delayWhen, shareReplay } from "rxjs/operators";
import { ComponentLoader, ComponentLoaderConfig } from "../component-loader";
import { getApplicationLoader, getApplicationService, globalPlanet } from "../global-planet";
import { coerceArray } from "../helpers";
import { Component, ComponentConfig } from "../interfaces";


export class NgComponentLoader implements ComponentLoader {

  private domPortalOutletCache = new WeakMap<any, DomPortalOutlet>();

    private get applicationLoader() {
        return getApplicationLoader();
    }

    private get applicationService() {
        return getApplicationService();
    }

    constructor(
        private applicationRef: ApplicationRef,
        private ngModuleRef: NgModuleRef<any>,
        private ngZone: NgZone,
        @Inject(DOCUMENT) private document: any
    ) {}

    private getPlantAppRef(name: string): Observable<ApplicationRef> {
        if (globalPlanet.apps[name] && globalPlanet.apps[name].appModuleRef) {
            return of(globalPlanet.apps[name]);
        } else {
            const app = this.applicationService.getAppByName(name);
            return this.applicationLoader.preload(app, true).pipe(
                map(() => {
                    return globalPlanet.apps[name];
                })
            );
        }
    }

    private createInjector<TData>(
        appModuleRef: NgModuleRef<any>,
        componentRef: PlanetComponentRef<TData>
    ): PortalInjector {
        const injectionTokens = new WeakMap<any, any>([[PlanetComponentRef, componentRef]]);
        const defaultInjector = appModuleRef.injector;
        return new PortalInjector(defaultInjector, injectionTokens);
    }

    private getContainerElement(config: PlantComponentConfig): HTMLElement {
        if (!config.container) {
            throw new Error(`config 'container' cannot be null`);
        } else {
            if ((config.container as ElementRef).nativeElement) {
                return (config.container as ElementRef).nativeElement;
            } else {
                return config.container as HTMLElement;
            }
        }
    }

    private createWrapperElement(config: PlantComponentConfig) {
        const container = this.getContainerElement(config);
        const element = this.document.createElement('div');
        const subApp = this.applicationService.getAppByName(this.ngModuleRef.instance.appName);
        element.classList.add(componentWrapperClass);
        element.setAttribute('planet-inline', '');
        if (config.wrapperClass) {
            element.classList.add(config.wrapperClass);
        }
        if (subApp && subApp.stylePrefix) {
            element.classList.add(subApp.stylePrefix);
        }
        container.appendChild(element);
        return element;
    }

    private attachComponent<TData>(
        plantComponent: Component,
        appModuleRef: NgModuleRef<any>,
        config: ComponentConfig
    ): PlanetComponentRef<TData> {
        const plantComponentRef = new PlanetComponentRef();
        const componentFactoryResolver = appModuleRef.componentFactoryResolver;
        const appRef = this.applicationRef;
        const injector = this.createInjector<TData>(appModuleRef, plantComponentRef);
        const wrapper = this.createWrapperElement(config);
        let portalOutlet = this.domPortalOutletCache.get(wrapper);
        if (portalOutlet) {
            portalOutlet.detach();
        } else {
            portalOutlet = new DomPortalOutlet(wrapper, componentFactoryResolver, appRef, injector);
            this.domPortalOutletCache.set(wrapper, portalOutlet);
        }
        const componentPortal = new ComponentPortal(plantComponent.component, null);
        const componentRef = portalOutlet.attachComponentPortal<TData>(componentPortal);
        if (config.initialState) {
            Object.assign(componentRef.instance, config.initialState);
        }
        plantComponentRef.componentInstance = componentRef.instance;
        plantComponentRef.componentRef = componentRef;
        plantComponentRef.wrapperElement = wrapper;
        plantComponentRef.dispose = () => {
            this.domPortalOutletCache.delete(wrapper);
            portalOutlet.dispose();
        };
        return plantComponentRef;
    }

    private registerComponentFactory(componentOrComponents: Component | Component[]) {
        const app = this.ngModuleRef.instance.appName;
        this.getPlantAppRef(app).subscribe(appRef => {
            appRef.registerComponentFactory((componentName: string, config: ComponentConfig) => {
                const components = coerceArray(componentOrComponents);
                const component = components.find(item => item.name === componentName);
                if (component) {
                    return this.ngZone.run(() => {
                        const componentRef = this.attachComponent<any>(component, appRef.appModuleRef, config);
                        return componentRef;
                    });
                } else {
                    throw Error(`unregistered component ${componentName} in app ${app}`);
                }
            });
        });
    }

    register(components: Component | Component[]) {
        setTimeout(() => {
            this.registerComponentFactory(components);
        });
    }

    load<TComp = unknown, TData = unknown>(
        app: string,
        componentName: string,
        config: ComponentConfig<TData>
    ): Observable<ComponentRef<TComp>> {
        const result = this.getPlantAppRef(app).pipe(
            delayWhen(appRef => {
                if (appRef.getComponentFactory()) {
                    return of('');
                } else {
                    // Because register use 'setTimeout',so timer 20
                    return timer(20);
                }
            }),
            map(appRef => {
                const componentFactory = appRef.getComponentFactory();
                if (componentFactory) {
                    return componentFactory<TData, TComp>(componentName, config);
                } else {
                    throw new Error(`${app}'s component(${componentName}) is not registered`);
                }
            }),
            shareReplay()
        );
        result.subscribe();
        return result;
    }

}
