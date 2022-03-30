import { ApplicationRef, ComponentFactory, IApplication } from "micro-front";
import { Observable } from "rxjs";


export class ReactApplicationRef extends ApplicationRef {
  get selector(): string {
    throw new Error("Method not implemented.");
  }
  navigateByUrl(url: string): void {
    throw new Error("Method not implemented.");
  }
  bootstrap(app: IApplication): Observable<this> {
    throw new Error("Method not implemented.");
  }
  getComponentFactory(): ComponentFactory {
    throw new Error("Method not implemented.");
  }
  registerComponentFactory(componentFactory: ComponentFactory): void {
    throw new Error("Method not implemented.");
  }
  destroy(): void {
    throw new Error("Method not implemented.");
  }
  getCurrentRouterStateUrl(): string {
    throw new Error("Method not implemented.");
  }

}
