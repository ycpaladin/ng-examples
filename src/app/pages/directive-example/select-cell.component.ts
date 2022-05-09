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
  selector: "select-cell",
  template: `
    <!-- 弹出窗口需要使用的表单模板 -->
    <ng-template let-data>
      <form [formGroup]="data.formGroup">
        <nz-select formControlName="text">
          <nz-option [nzLabel]="10" [nzValue]="10"> </nz-option>
          <nz-option [nzLabel]="20" [nzValue]="20"> </nz-option>
          <nz-option [nzLabel]="30" [nzValue]="30"> </nz-option>
          <nz-option [nzLabel]="40" [nzValue]="40"> </nz-option>
        </nz-select>
      </form>
    </ng-template>
    <div (click)="openModal()" *ngIf="openModal">{{ cellValue }}</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EDITABLE_CELL, useExisting: SelectCellComponent }],
})
export class SelectCellComponent implements OnInit, IEditableCell {
  @Input() modalTitle: string;
  @Input() cellValue!: number;

  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<void>;
  openModal!: () => void;

  constructor() {}
  createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      text: [this.cellValue],
    });
  }
  registerOnOpenModal(fn: () => void): void {
    this.openModal = fn;
  }
  formatFormValue(value: any): string {
    const { text } = value;
    return text;
  }

  ngOnInit(): void {}
}
