import { Observable } from 'rxjs';
import { IApplication } from '../interfaces';
import { PlanetApplication } from '../planet.class';
import { ApplicationRef } from './application-ref';


export abstract class ApplicationLoader {
  loadingDone: boolean = false; // TODO
  abstract get appStatusChange(): Observable<any>; // TODO
  abstract get appsLoadingStart(): Observable<any>;  // TODO
  abstract reroute(url: string): void;
  abstract preload(app: PlanetApplication, immediate?: boolean): Observable<ApplicationRef>;
}
