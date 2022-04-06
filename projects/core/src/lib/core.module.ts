import { NgModule, ModuleWithProviders } from '@angular/core';
import { User as UserSubject } from './service';
import { IUserService } from './interfaces';
import { USER_SERVICE } from './token';
import { User } from './base';

@NgModule()
export class CoreModule {
  static forRoot(userService: IUserService): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        UserSubject,
        { provide: User, useExisting: UserSubject },
        { provide: USER_SERVICE, useValue: userService }
      ]
    }
  }
}
