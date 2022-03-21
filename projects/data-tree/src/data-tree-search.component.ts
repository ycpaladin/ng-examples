import { Observable } from 'rxjs';
import { ITreeSearch, SelectOption, TreeSearchData } from './interfaces';
import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { SEARCH_TOKEN } from './token';
import { SearchCategory, TreeSearchKeywords } from './services';

@Component({
  selector: 'lib-data-tree-search',
  templateUrl: './data-tree-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: SEARCH_TOKEN, useExisting: forwardRef(() => DataTreeSearchComponent) },
    SearchCategory
  ]
})
export class DataTreeSearchComponent implements OnInit, ITreeSearch {

  data!: TreeSearchData;

  options$: Observable<SelectOption[]>;

  constructor(
    public optionProvder: SearchCategory,
    private service: TreeSearchKeywords
  ) {
    this.data = service.value;
    this.options$ = optionProvder.pipe();
  }

  onSearchTextChange(keywords: string): void {
    this.service.onSearchKeywordsChange(keywords);
  }
  onSelectedOptionChange(option: SelectOption): void {
    // this.service.onSelectChange()
  }

  ngOnInit(): void {
  }

}
