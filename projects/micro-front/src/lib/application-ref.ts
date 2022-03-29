import { Observable } from 'rxjs';
import { IApplication } from './interfaces';


export abstract class ApplicationRef {
  abstract navigateByUrl(url: string): void;
  abstract bootstrap(app: IApplication): Observable<this>;

  portalApp: IApplication;
}
