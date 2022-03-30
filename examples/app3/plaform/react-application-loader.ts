import { ApplicationLoader, ApplicationRef, PlanetApplication } from "micro-front";
import { Observable } from "rxjs";


export class ReactApplicationLoader extends ApplicationLoader {
  loadingDone: boolean;
  get appStatusChange(): Observable<any> {
    throw new Error("Method not implemented.");
  }
  get appsLoadingStart(): Observable<any> {
    throw new Error("Method not implemented.");
  }
  reroute(url: string): void {
    throw new Error("Method not implemented.");
  }
  preload(app: PlanetApplication<any>, immediate?: boolean): Observable<ApplicationRef> {
    throw new Error("Method not implemented.");
  }

}
