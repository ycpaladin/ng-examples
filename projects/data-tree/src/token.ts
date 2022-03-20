import { InjectionToken } from '@angular/core';
import { TreeModuleConfig } from './interfaces';

export const SEARCH_TOKEN = new InjectionToken<void>('SEARCH_TOKEN');
export const TREE_TOKEN = new InjectionToken<void>('TREE_TOKEN');
export const TREE_CONFIG = new InjectionToken<TreeModuleConfig>('TreeModuleConfig');

