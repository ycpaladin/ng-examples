import { NzFormModule } from "ng-zorro-antd/form";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NzModalModule } from "ng-zorro-antd/modal";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzTableModule } from "ng-zorro-antd/table";
import { ReactiveFormsModule } from "@angular/forms";

import { DirectiveExampleRoutingModule } from "./directive-example-routing.module";
import { DirectiveExampleComponent } from "./directive-example.component";
import { EditableCellDirective } from "./editable-cell.directive";
import { InputCellComponent } from "./input-cell.component";
import { DateCellComponent } from "./date-cell.component";
import { SelectCellComponent } from "./select-cell.component";
import { SplitCellComponent } from "./split-cell.component";

@NgModule({
  declarations: [
    DirectiveExampleComponent,
    InputCellComponent,
    EditableCellDirective,
    DateCellComponent,
    SelectCellComponent,
    SplitCellComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveExampleRoutingModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule,
    NzFormModule,
  ],
})
export class DirectiveExampleModule {}
