import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListData } from './services';

@Component({
  selector: 'lib-data-list',
  templateUrl: './data-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent implements OnInit {


  constructor(public data$: ListData) {
  }

  ngOnInit(): void {
  }

}
