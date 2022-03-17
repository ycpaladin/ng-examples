import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action } from './models';

const INIT = 'redux//init';

/**
 * ActionsSubject的作用在于发送action
 */
@Injectable()
export class ActionSubject extends BehaviorSubject<Action> implements OnDestroy {

  constructor() {
    super({ type: INIT });
  }

  override next(value: Action<string>): void {
    // 检查value 是否为一个准确的数据结构
    // TODO.

    super.next(value);
  }

  override complete(): void {
  }

  ngOnDestroy(): void {
    this.complete();
  }
}
