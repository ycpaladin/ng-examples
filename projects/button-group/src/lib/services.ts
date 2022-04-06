import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PagedData } from 'data-table';

import { IDeleteService, IDeleteDataItemProvider } from './interfaces';
import { DELETE_DATA } from './token';

@Injectable()
export class DeleteService extends BehaviorSubject<number> implements IDeleteService, OnDestroy {

  constructor(
    @Inject(DELETE_DATA) service: IDeleteDataItemProvider,
    private pageData: PagedData,
    private messageService: NzMessageService,
  ) {
    super(null);

    this.pipe(
      filter(id => !!id),
      mergeMap(id => service.deleteById(id))
    ).subscribe(result => {
      if (result) {
        this.messageService.info('删除成功!');
        this.refresh();
      } else {
        // 删除失败， http 拦截器处理
        // this.messageService.info('删除出现错误!');
      }
    })
  }


  delete(id: number): void {
    this.next(id);
  }

  refresh(): void {
    this.pageData.refresh();
  }

  ngOnDestroy(): void {
    console.log(this.observers.length);
    this.complete();
    console.log('completed:', this.observers.length);
  }
}
