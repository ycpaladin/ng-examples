import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEditableCell } from "./interfaces";
import { EDITABLE_CELL } from "./token";

@Component({
  selector: "split-cell",
  template: `
    <!-- 弹出窗口需要使用的表单模板 -->
    <ng-template let-data>
      <form [formGroup]="data.formGroup">
        <nz-form-item nzFlex>
          <nz-form-control nzSpan="24" [nzErrorTip]="sErrorTip">
            <textarea nz-input formControlName="s"></textarea>
            <ng-template #sErrorTip let-control>
              <ng-container *ngIf="control.hasError('required')">
                必须填写！
              </ng-container>
            </ng-template>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nzFlex>
          <nz-form-control nzSpan="24" [nzErrorTip]="eErrorTip">
            <textarea nz-input formControlName="e"></textarea>
            <ng-template #eErrorTip let-control>
              <ng-container *ngIf="control.hasError('required')">
                必须填写！
              </ng-container>
            </ng-template>
          </nz-form-control>
        </nz-form-item>
      </form>
    </ng-template>
    <div (click)="openModal()" *ngIf="openModal">{{ cellValue }}</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EDITABLE_CELL, useExisting: SplitCellComponent }], // 提供一个 EDITABLE_CELL ， 以便属性指令中能访问到本组件
})
export class SplitCellComponent implements OnInit, IEditableCell {
  @Input() cellValue!: string;
  @Input() modalTitle!: string;
  // 在视图中查找表单模板
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<void>;

  // 打开窗口
  openModal!: () => void;

  constructor() {}

  // 创建表单
  createForm(fb: FormBuilder): FormGroup {
    const [s, e] = (this.cellValue || "").split("_");
    return fb.group({
      s: [s, [Validators.required]],
      e: [e, [Validators.required]],
    });
  }

  // 注册一个打开弹出窗口的方法
  registerOnOpenModal(fn: () => void): void {
    this.openModal = fn;
  }

  // 格式化表单的值
  formatFormValue(value: any): string {
    const { s, e } = value;
    return `${s}_${e}`;
  }

  ngOnInit(): void {}
}
