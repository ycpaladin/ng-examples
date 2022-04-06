import { ChangeDetectionStrategy, Component, ContentChild, Directive, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IDataItem, ITableColumn, ITableColumnContent, ITableColumnContentData } from './interfaces';
import { MODAL_COLUMN_CONTENT, MODAL_COLUMN_FOOTER, MODAL_COLUMN_TITLE, TABLE_COLUMN, TABLE_COLUMN_CONTENT } from './token';


/**
 * 一个常规的文本列，可以通过子元素自定义模板
 * ```html
 * <text-column>
 *  <ng-template *columnContent let-data>
 *    data
 *  </ng-template>
 * </text-column>
 * ```
 */
@Directive({
  selector: 'text-column',
  providers: [{ provide: TABLE_COLUMN, useExisting: forwardRef(() => DataTableColumnDirective) }]
})
export class DataTableColumnDirective implements ITableColumn {

  @Input() nzTitle: string | TemplateRef<void>;
  @Input() dataKey: string;
  @Input() sortKey?: string;
  @Input() searchKey?: string;

  @ContentChild(TABLE_COLUMN_CONTENT, { static: true, read: TemplateRef }) contentFromContentChild!: TemplateRef<void>
  constructor() { }

}


@Directive({
  selector: '[columnContent]',
  exportAs: 'columnContent',
  providers: [
    { provide: TABLE_COLUMN_CONTENT, useExisting: forwardRef(() => DataTableColumnContentDirective) },
  ]
})
export class DataTableColumnContentDirective implements ITableColumnContent {
  constructor(public templateRef: TemplateRef<ITableColumnContentData>) { }
}

@Directive({
  selector: '[modalTitle]',
  exportAs: 'modalTitle',
  providers: [
    { provide: MODAL_COLUMN_TITLE, useExisting: forwardRef(() => DataTableColumnContentDirective) },
  ]
})
export class DataTableModalColumnTitleDirective implements ITableColumnContent {
  constructor(public templateRef: TemplateRef<ITableColumnContentData>) { }
}

@Directive({
  selector: '[modalContent]',
  exportAs: 'modalContent',
  providers: [
    { provide: MODAL_COLUMN_CONTENT, useExisting: forwardRef(() => DataTableColumnContentDirective) },
  ]
})
export class DataTableModalColumnContentDirective implements ITableColumnContent {
  constructor(public templateRef: TemplateRef<ITableColumnContentData>) { }
}

@Directive({
  selector: '[modalFooter]',
  exportAs: 'modalFooter',
  providers: [
    { provide: MODAL_COLUMN_FOOTER, useExisting: forwardRef(() => DataTableColumnContentDirective) },
  ]
})
export class DataTableModalColumnFooterDirective implements ITableColumnContent {
  constructor(public templateRef: TemplateRef<ITableColumnContentData>) { }
}


/**
 * 格式化日期列，内部封装了 DatePipe `date:yyyy-MM-dd HH:mm:ss`
 */
@Component({
  selector: 'date-column',
  template: `
    <ng-template #template let-data>
      <ng-container *ngIf="format">
        {{data[dataKey]|date:format}}
      </ng-container>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TABLE_COLUMN, useExisting: forwardRef(() => DateColumnComponent) }]
})
export class DateColumnComponent implements OnInit, ITableColumn {

  @Input() nzTitle: string | TemplateRef<void>;
  @Input() dataKey: string;
  @Input() sortKey?: string;
  @Input() searchKey?: string;
  @Input() format: string = 'yyyy-MM-dd HH:mm:ss';

  @ViewChild('template', { static: true }) contentFromContentChild!: TemplateRef<void>
  constructor() { }

  ngOnInit(): void {
  }

}



/**
 * 自动生成一个链接，点击后跳转到数据详情页面
 */
@Component({
  selector: 'link-view-column',
  template: `
    <ng-template #template let-data>
      <a [routerLink]="[data.id]">{{data[dataKey]}}</a>
      <!-- TODO 权限判定， 没有权限则不能点击 -->
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TABLE_COLUMN, useExisting: forwardRef(() => LinkViewColumnComponent) }]
})
export class LinkViewColumnComponent implements OnInit, ITableColumn {

  @Input() nzTitle: string | TemplateRef<void>;
  @Input() dataKey: string;
  @Input() sortKey?: string;
  @Input() searchKey?: string;

  @ViewChild('template', { static: true }) contentFromContentChild!: TemplateRef<void>
  constructor() { }

  ngOnInit(): void {
  }

}



/**
 * 自动生成一个链接，点击后跳转到数据详情页面
 */
@Component({
  selector: 'open-modal-column',
  template: `
    <ng-template #template let-data>
      <a (click)="handleClick(data)">{{data[dataKey]}}</a>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TABLE_COLUMN, useExisting: forwardRef(() => OpenModalColumnComponent) }],
  exportAs: 'openModalColumn'
})
export class OpenModalColumnComponent implements OnInit, ITableColumn {

  @Input() nzTitle: string | TemplateRef<void>;
  @Input() dataKey: string;
  @Input() sortKey?: string;
  @Input() searchKey?: string;
  @Output() onClick = new EventEmitter<IDataItem>();

  @ViewChild('template', { static: true }) contentFromContentChild!: TemplateRef<void>;
  @ContentChild(MODAL_COLUMN_TITLE, { static: true, read: TemplateRef }) modalTitle: TemplateRef<IDataItem>;
  @ContentChild(MODAL_COLUMN_CONTENT, { static: true, read: TemplateRef }) modalTemplate: TemplateRef<IDataItem>;
  @ContentChild(MODAL_COLUMN_FOOTER, { static: true, read: TemplateRef }) modalFooter: TemplateRef<IDataItem>;

  nzModalRef: NzModalRef<any>;

  handleClick(data: IDataItem): void {
    if (this.onClick.observers.length) {
      this.onClick.emit(data);
    }
    this.openModal(data);
  }

  close = () => {
    if (this.nzModalRef) {
      this.nzModalRef.close();
    }
  }

  openModal(data: IDataItem): void {
    if (!this.modalTemplate) {
      return;
    }
    this.nzModalRef = this.modalService.create({
      nzTitle: this.modalTitle || '',
      nzContent: this.modalTemplate,
      nzComponentParams: data,
      nzMaskClosable: false,
      nzFooter: this.modalFooter
    });
  }

  constructor(private modalService: NzModalService) { }  //

  ngOnInit(): void {
  }

}
