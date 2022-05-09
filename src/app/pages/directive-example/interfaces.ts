import { TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

export interface IEditableCell {
  // 窗口的标题
  modalTitle: string;
  // 窗口的表单内容模板
  template: TemplateRef<void>;
  // 为组件注册一个创建表单的方法
  createForm(fb: FormBuilder): FormGroup;
  // 为组件注册一个打开弹出窗口的方法
  registerOnOpenModal(fn: () => void): void;
  // 为组件注册一个格式化表单值的方法
  formatFormValue(value: any): string;
}
