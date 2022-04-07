import { NgModule } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BasicPageLayoutComponent } from './basic-page-layout.component';



@NgModule({
  declarations: [

    BasicPageLayoutComponent
  ],
  imports: [
    NzGridModule,
    NzCardModule
  ],
  exports: [
    BasicPageLayoutComponent
  ]
})
export class PageLayoutModule { }
