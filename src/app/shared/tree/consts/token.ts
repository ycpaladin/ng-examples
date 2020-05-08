import { InjectionToken } from '@angular/core';
import { ITreeService } from '../models/tree-service-base';

export const TREE_SERVICE_TOKEN = new InjectionToken<ITreeService>('TREE_SERVICE_TOKEN');
