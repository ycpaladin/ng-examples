import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchGroupComponent } from './search-group.component';
import { ControlTextComponent } from './control-text.component';
import { ControlSelectComponent } from './control-select.component';
import { ControlDateComponent } from './control-date.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ControlFactoryDirective } from './control-factory.directive';
import { OptionsPipe } from './options.pipe';



@NgModule({
  declarations: [
    SearchGroupComponent,
    ControlTextComponent,
    ControlSelectComponent,
    ControlDateComponent,
    ControlFactoryDirective,
    OptionsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzDatePickerModule
  ],
  exports: [
    SearchGroupComponent
  ]
})
export class SearchGroupModule {

}
