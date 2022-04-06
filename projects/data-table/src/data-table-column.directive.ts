import { ChangeDetectionStrategy, Component, ContentChild, Directive, forwardRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ITableColumn, ITableColumnContent, ITableColumnContentData } from './interfaces';
import { TABLE_COLUMN, TABLE_COLUMN_CONTENT } from './token';

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
  providers: [{ provide: TABLE_COLUMN_CONTENT, useExisting: forwardRef(() => DataTableColumnContentDirective) }]
})
export class DataTableColumnContentDirective implements ITableColumnContent {
  constructor(public templateRef: TemplateRef<ITableColumnContentData>) { }
}



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
