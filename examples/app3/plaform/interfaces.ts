import { IApplication } from "micro-front";

export type DefineApplicationConfig = {
  selector: string;
  bootstrap: (app: IApplication, element: HTMLElement, extra: any) => void
}
