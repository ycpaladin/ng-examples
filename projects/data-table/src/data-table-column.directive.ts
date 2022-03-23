import { ContentChild, Directive, forwardRef, Input, TemplateRef } from '@angular/core';
import { ITableColumn, ITableColumnContent, ITableColumnContentData } from './interfaces';
import { TABLE_COLUMN, TABLE_COLUMN_CONTENT } from './token';

@Directive({
  selector: 'column',
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
