import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo05RoutingModule } from './demo05-routing.module';
import { TableComponent } from './components/table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Demo05IndexComponent } from './pages/demo05-index/demo05-index.component';


@NgModule({
  declarations: [TableComponent, Demo05IndexComponent],
  imports: [
    CommonModule,
    Demo05RoutingModule,
    NzTableModule
  ]
})
export class Demo05Module { }
