import { Component, OnInit } from '@angular/core';
import { IDataItem } from 'data-table';

@Component({
  selector: 'app-data-table-test',
  templateUrl: './data-table-test.component.html',
  styleUrls: ['./data-table-test.component.less']
})
export class DataTableTestComponent implements OnInit {

  disabledFn = (item:IDataItem) => item.id % 2 === 0;
  constructor() { }

  ngOnInit(): void {
  }

}
