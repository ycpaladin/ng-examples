import { Subject } from 'rxjs';
import { QueryParamsChange } from 'projects/data-table/src/services';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SearchGroupConfig } from './interfaces';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchGroupComponent implements OnInit, OnDestroy {

  @Input() config!: SearchGroupConfig;

  @Output() onChange = new EventEmitter<{ [K: string]: any }>();
  destory$ = new Subject<void>();

  constructor(private queryParamsChange: QueryParamsChange) {
    this.queryParamsChange.pipe(takeUntil(this.destory$)).subscribe(this.onChange);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

}
