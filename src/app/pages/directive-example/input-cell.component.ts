import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IEditableCell } from "./interfaces";
import { EDITABLE_CELL } from "./token";

@Component({
  selector: "input-cell",
  template: `
    <!-- 弹出窗口需要使用的表单模板 -->
    <ng-template let-data>
      <form [formGroup]="data.formGroup">
        <input nz-input formControlName="text" />
      </form>
    </ng-template>
    <div (click)="openModal()" *ngIf="openModal">{{ cellValue }}</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EDITABLE_CELL, useExisting: InputCellComponent }], // 提供一个 EDITABLE_CELL ， 以便属性指令中能访问到本组件
})
export class InputCellComponent implements OnInit, IEditableCell {
  @Input() cellValue!: string;
  @Input() modalTitle!: string;
  // 在视图中查找表单模板
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<void>;

  // 打开窗口
  openModal!: () => void;

  constructor() {}

  // 创建表单
  createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      text: [this.cellValue],
    });
  }

  // 注册一个打开弹出窗口的方法
  registerOnOpenModal(fn: () => void): void {
    this.openModal = fn;
  }

  // 格式化表单的值
  formatFormValue(value: any): string {
    const { text } = value;
    return text;
  }

  ngOnInit(): void {}
}
