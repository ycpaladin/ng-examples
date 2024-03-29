import { InjectionToken } from '@angular/core';
import { ITableColumn, ITableColumnContent } from './interfaces';

export const PAGED_DATA_SERVICE = new InjectionToken<void>('PAGED_DATA_SERVICE');

export const MODULE_CONFIG = new InjectionToken<void>('MODULE_CONFIG');
export const TABLE_COLUMN_CONTENT = new InjectionToken<ITableColumnContent>('TABLE_COLUMN_CONTENT');
export const TABLE_COLUMN_SEARCH = new InjectionToken<ITableColumnContent>('TABLE_COLUMN_SEARCH');
export const TABLE_COLUMN = new InjectionToken<ITableColumn>('TABLE_COLUMN');
