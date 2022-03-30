import { ComponentConfig, ComponentLoader, ComponentRef } from "micro-front";
import { Observable } from "rxjs";

const loadKey = 'react';
export class ReactComponentLoader extends ComponentLoader {
  get loadKey(): string {
    return loadKey
  }

  load<TComp = unknown, TData = unknown>(app: string, componentName: string, config: ComponentConfig<TData>): Observable<ComponentRef<TComp>> {
    throw new Error("Method not implemented.");
  }

}
