import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonService1Service } from './services/common-service1.service';
import { ListLayoutComponent } from './components/list-layout/list-layout.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzAddOnModule } from 'ng-zorro-antd/core';



@NgModule({
  declarations: [ListLayoutComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    NzAddOnModule
  ],
  exports: [ListLayoutComponent],
  providers: [CommonService1Service]
})
export class CommonsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonsModule,
      providers: [CommonService1Service]
    };
  }
}
