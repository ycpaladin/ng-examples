import { Injectable } from '@angular/core';
import { ITreeService } from 'src/app/shared/tree/models/tree-service-base';

@Injectable()
export class TreeService implements ITreeService {
  extendKeys: string[];

  constructor() {
    this.extendKeys = [];
  }

}
