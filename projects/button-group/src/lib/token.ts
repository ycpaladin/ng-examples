import { InjectionToken } from "@angular/core";
import { IButton, IButtonContent, IDataContext, IDeleteDataItemProvider } from "./interfaces";


export const BUTTON = new InjectionToken<IButton>('BUTTON');
export const ICON_BUTTON = new InjectionToken<IButton>('ICON_BUTTON');
export const BUTTON_CONTENT = new InjectionToken<IButtonContent>('BUTTON_CONTENT');
export const DATA_CONTEXT = new InjectionToken<IDataContext<any>>('DATA_CONTEXT');
export const DELETE_DATA = new InjectionToken<IDeleteDataItemProvider>('DELETE_DATA');
