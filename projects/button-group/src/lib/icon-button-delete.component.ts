import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, forwardRef, Inject, Input, Output, TemplateRef, ViewChild, Optional } from '@angular/core';
import { IDataItem } from 'core';
import { IButton, IDataContext } from './interfaces';
import { DeleteService } from './services';
import { ICON_BUTTON, DATA_CONTEXT } from './token';

@Component({
  selector: 'lib-icon-button-delete',
  template: `
  <ng-template #buttonTemplate>
    <i
      nz-icon
      nz-tooltip
      [nzTooltipTitle]="buttonText"
      nz-popconfirm
      nzPopconfirmTitle="确实要删除吗?"
      (nzOnConfirm)="onClick()"
      [nzType]="buttonType"
      nzTheme="outline"
      *ngIf="!buttonDisabled else defaultView"
    ></i>
    <ng-template #defaultView>
      <i
        nz-icon
        [nzType]="buttonType"
        nzTheme="outline"
        class="disabled"
      ></i>
    </ng-template>
  </ng-template>
  `,
  styleUrls: ['./icon-button-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ICON_BUTTON, useExisting: forwardRef(() => IconButtonDeleteComponent) }]
})
export class IconButtonDeleteComponent implements OnInit, IButton {

  buttonText: string = '删除';
  @Input() buttonDisabled: boolean;
  buttonType: string = 'delete';
  @Output() click = new EventEmitter<void>();
  @ViewChild('buttonTemplate', { static: true }) template: TemplateRef<any>;

  onClick(): void {
    if (this.deleteService) {
      this.deleteService.delete(this.dataContext.data.id);
    }
  }

  constructor(
    @Inject(DATA_CONTEXT) public dataContext: IDataContext<IDataItem>,
    @Optional() private deleteService: DeleteService  // TODO 分为2种 一种为远程删除， 还有一种为本地删除（例如在某个本地数组、FormArray中删除）
  ) {
    if (!deleteService) {
      // TODO 警告
    }
    this.click.subscribe(this.onClick.bind(this));
  }

  ngOnInit(): void {
  }

}

