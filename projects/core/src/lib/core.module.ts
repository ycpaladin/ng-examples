import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { Role, User} from './services';
import { IUserService } from './interfaces';
import { USER_SERVICE } from './token';
// import { User } from './base';

@NgModule()
export class CoreModule {
  static forRoot(userService: Type<IUserService>): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        User,
        Role,
        userService,
        { provide: USER_SERVICE, useExisting: userService }
      ]
    }
  }
}
