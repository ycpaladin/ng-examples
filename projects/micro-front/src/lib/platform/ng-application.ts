import { IApplication } from '../interfaces';


export class NgApplication implements IApplication{
  navigateByUrl(url: string, extras?: any): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}
