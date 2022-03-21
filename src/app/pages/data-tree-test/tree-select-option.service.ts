import { Injectable } from '@angular/core';
import { SearchSelectOptionProvider, SelectOption } from 'data-tree';
import { Observable, of } from 'rxjs';

@Injectable()
export class TreeSelectOptionService implements SearchSelectOptionProvider {

  constructor() { }
  getOptions(): Observable<SelectOption[]> {
    return of([
      { label: '部门', value: { api: '/lms/api/v1/department-management/list', searchKey: 'search_global__icontains' } },
      { label: '组织', value: { api: '/lms/api/v1/organization-management/list', searchKey: 'search_global__icontains' } },
    ])
  }
}
