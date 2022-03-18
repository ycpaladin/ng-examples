import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SearchGroupConfig } from './interfaces';

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchGroupComponent implements OnInit {

  @Input() config!: SearchGroupConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
