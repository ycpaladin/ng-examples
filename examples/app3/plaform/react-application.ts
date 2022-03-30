import { IApplication } from "micro-front";


export class ReactApplication implements IApplication {

  navigateByUrl(url: string, extras?: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}
