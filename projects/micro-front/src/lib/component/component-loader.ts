import { Observable } from "rxjs";
import { ApplicationLoader } from "../application/application-loader";
import { getApplicationLoader, getApplicationService } from "../global-planet";
import { ComponentConfig } from "../interfaces";
import { ComponentRef } from "./component-ref";


export abstract class ComponentLoader {

  protected get applicationLoader(): ApplicationLoader {
    return getApplicationLoader(this.loadKey);
  }

  protected get applicationService() {
    return getApplicationService();
  }

  abstract get loadKey(): string;
  abstract load<TComp = unknown, TData = unknown>(app: string, componentName: string, config: ComponentConfig<TData>): Observable<ComponentRef<TComp>>;
}
