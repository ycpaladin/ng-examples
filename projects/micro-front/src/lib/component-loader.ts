import { ComponentConfig } from "./interfaces";


export abstract class ComponentLoader {
  abstract load<T>(app: string, componentName: string, config: ComponentConfig): T;
}
