import { InjectionToken } from '@angular/core';
import { TreeModuleConfig, SelectOption } from './interfaces';

export const SEARCH_TOKEN = new InjectionToken<void>('SEARCH_TOKEN');
export const TREE_TOKEN = new InjectionToken<void>('TREE_TOKEN');
export const TREE_CONFIG = new InjectionToken<TreeModuleConfig>('TreeModuleConfig');
export const SEARCH_CATEGORY = new InjectionToken<SelectOption[]>('SEARCH_CATEGORY');

