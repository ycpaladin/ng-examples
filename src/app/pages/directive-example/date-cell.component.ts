import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  Input,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { format } from "date-fns";
import { IEditableCell } from "./interfaces";
import { EDITABLE_CELL } from "./token";

@Component({
  selector: "date-cell",
  template: `
    <!-- 弹出窗口需要使用的表单模板 -->
    <ng-template let-data>
      <form [formGroup]="data.formGroup">
        <nz-date-picker formControlName="date"></nz-date-picker>
      </form>
    </ng-template>
    <div (click)="openModal()" *ngIf="openModal">{{ cellValue }}</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EDITABLE_CELL, useExisting: DateCellComponent }],
})
export class DateCellComponent implements OnInit, IEditableCell {
  @Input() modalTitle: string;
  @Input() cellValue!: Date;

  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<void>;
  openModal!: () => void;

  constructor() {}
  createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      date: [this.cellValue],
    });
  }
  registerOnOpenModal(fn: () => void): void {
    this.openModal = fn;
  }
  formatFormValue(value: any): string {
    const { date } = value;
    return format(date, "yyyy-MM-dd");
  }

  ngOnInit(): void {}
}
