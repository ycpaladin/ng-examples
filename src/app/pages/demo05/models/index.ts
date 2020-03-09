import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

type Constructor<T> = new (...args: any[]) => T;

export function withDestory<T extends Constructor<{}>>(Base: T = (class { } as any)) {
  return class Wrap extends Base implements OnDestroy {
    destory$ = new Subject<void>();
    ngOnDestroy(): void {
      this.destory$.next();
      this.destory$.complete();
    }

  };
}
