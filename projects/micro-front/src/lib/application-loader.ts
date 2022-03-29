import { Observable } from 'rxjs';


export abstract class ApplicationLoader {
  abstract get loadingDone(): boolean; // TODO
  abstract get appStatusChange(): Observable<any>; // TODO
  abstract get appsLoadingStart(): Observable<any>;  // TODO
  abstract reroute(url: string): void;
}
