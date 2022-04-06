import { IUserService } from './interfaces';
import { InjectionToken } from '@angular/core';


export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE'); // </IUserService>
