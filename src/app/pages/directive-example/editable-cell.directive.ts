import {
  Directive,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  Self,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd/modal";
import { IEditableCell } from "./interfaces";
import { EDITABLE_CELL } from "./token";

@Directive({
  selector: "[editable-cell]",
})
export class EditableCellDirective implements OnInit {
  @Output() valueChange = new EventEmitter<string>();

  formGroup!: FormGroup;

  // 打开窗口
  openModal = () => {
    const modalRef = this.modalService.create({
      nzTitle: this.component.modalTitle,
      nzContent: this.component.template, // ?? 访问组件内的模板 template
      nzComponentParams: {
        formGroup: this.formGroup,
      },
      nzFooter: [
        {
          label: "保存",
          disabled: () => this.formGroup.invalid,
          onClick: () => {
            const value = this.component.formatFormValue(this.formGroup.value); // 在这里格式化表单的值
            modalRef.close(value); // 关闭窗口，并返回值
          },
        },
      ],
    });

    // 订阅窗口关闭事件
    const sub$ = modalRef.afterClose.subscribe((value) => {
      if (value) {
        this.valueChange.emit(value); // 往外发射值
      }
      Promise.resolve().then(() => sub$.unsubscribe()); // 取消订阅
    });
  };

  constructor(
    // 注入 EDITABLE_CELL， 意味着组件实例被注入， 由于我们只需要访问接口中约定的方法，不关心到底是什么组件，所以使用接口作为类型，
    @Inject(EDITABLE_CELL) @Self() public component: IEditableCell,
    public modalService: NzModalService,
    public fb: FormBuilder
  ) {
    component.registerOnOpenModal(this.openModal); // 在这里把打开窗口的方法注入给组件
  }
  ngOnInit(): void {
    this.formGroup = this.component.createForm(this.fb); // 在这里创建表单
  }
}
