import { Observable } from "rxjs";
import { ComponentConfig } from "../interfaces";
import { ComponentRef } from "./component-ref";


export abstract class ComponentLoader {
  abstract load<TComp = unknown, TData = unknown>(app: string, componentName: string, config: ComponentConfig<TData>): Observable<ComponentRef<TComp>>;
}
