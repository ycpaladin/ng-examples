import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';

import { ButtonGroupComponent } from './button-group.component';
import { ButtonContentDirective, ButtonDirective, IconButtonDirective } from './button.directive';
import { OperatorButtonCreateComponent } from './operator-button-create.component';
import { IconButtonGroupComponent } from './icon-button-group.component';

import {
  MoreOutline,
  EditOutline
} from '@ant-design/icons-angular/icons';
import { IconButtonEditComponent } from './icon-button-edit.component';

const icons = [MoreOutline, EditOutline];

@NgModule({
  declarations: [
    ButtonGroupComponent,
    ButtonDirective,
    IconButtonDirective,
    ButtonContentDirective,
    OperatorButtonCreateComponent,
    IconButtonGroupComponent,
    IconButtonEditComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzToolTipModule,
    NzDropDownModule,
    NzSpaceModule,
    NzIconModule,
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ],
  exports: [
    ButtonGroupComponent,
    ButtonDirective,
    ButtonContentDirective,
    IconButtonDirective,
    OperatorButtonCreateComponent,
    IconButtonGroupComponent,
    IconButtonEditComponent
  ]
})
export class ButtonGroupModule { }
