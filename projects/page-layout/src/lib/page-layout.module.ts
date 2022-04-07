import { NgModule } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BasicPageLayoutComponent } from './basic-page-layout.component';
import { MainPageLayoutComponent } from './main-page-layout.component';



@NgModule({
  declarations: [

    BasicPageLayoutComponent,
     MainPageLayoutComponent
  ],
  imports: [
    NzGridModule,
    NzCardModule
  ],
  exports: [
    BasicPageLayoutComponent,
    MainPageLayoutComponent
  ]
})
export class PageLayoutModule { }
