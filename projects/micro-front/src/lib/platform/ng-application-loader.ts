import { Observable } from "rxjs";
import { ApplicationLoader } from "../application-loader";


export class NgApplicationLoader extends ApplicationLoader {

  get loadingDone(): boolean {
    throw new Error("Method not implemented.");
  }
  get appStatusChange(): Observable<any> {
    throw new Error("Method not implemented.");
  }
  get appsLoadingStart(): Observable<any> {
    throw new Error("Method not implemented.");
  }
  reroute(url: string): void {
    throw new Error("Method not implemented.");
  }

  constructor() {
    super();
  }

}
