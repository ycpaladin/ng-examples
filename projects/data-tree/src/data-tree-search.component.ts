import { ITreeSearch, SelectOption } from './interfaces';
import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { SEARCH_TOKEN } from './token';

@Component({
  selector: 'lib-data-tree-search',
  templateUrl: './data-tree-search.component.html',
  styleUrls: ['./data-tree-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: SEARCH_TOKEN, useExisting: forwardRef(() => DataTreeSearchComponent) }]
})
export class DataTreeSearchComponent implements OnInit, ITreeSearch {

  constructor() { }

  onSearchTextChange(keywords: string): void {
  }
  onSelectedOptionChange(option: SelectOption): void {
  }

  ngOnInit(): void {
  }

}
