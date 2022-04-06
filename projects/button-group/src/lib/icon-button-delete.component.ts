import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, forwardRef, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { IDataItem } from 'data-table';
import { IButton, IDataContext } from './interfaces';
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
    // TODO...删除
    // TODO...刷新
  }

  constructor(
    @Inject(DATA_CONTEXT) public dataContext: IDataContext<IDataItem>
  ) {
    this.click.subscribe(this.onClick.bind(this));
  }

  ngOnInit(): void {
  }

}
