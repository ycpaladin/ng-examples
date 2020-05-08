import { NgModule, ModuleWithProviders, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo08RoutingModule } from './demo08-routing.module';
import { Demo08Component } from './demo08.component';
import { SharedModule } from '../../shared/shared.module';
import { TREE_SERVICE_TOKEN } from 'src/app/shared/tree/consts/token';
import { TreeService } from './tree.service';
import { NzInputModule, NzButtonModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [Demo08Component],
  imports: [
    CommonModule,
    Demo08RoutingModule,
    SharedModule,
    // SharedModule.forRoot({
    //   provide: TREE_SERVICE_TOKEN, useExisting: forwardRef(() => TreeService)
    // }),
    NzInputModule,
    NzButtonModule
  ],
  providers: [
    // TreeService
  ]
})
export class Demo08Module {
  // static forRoot(service: any): ModuleWithProviders {
  //   return {
  //     providers: [{
  //       provide: TREE_SERVICE_TOKEN, useExisting: TreeService
  //     }],
  //     ngModule: Demo08Module
  //   };
  // }
}
