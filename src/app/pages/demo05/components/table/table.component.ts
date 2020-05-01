import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NzTableComponent } from 'ng-zorro-antd';
import { tap, delay, map, takeUntil } from 'rxjs/operators';
import { withDestory } from '../../models';
import { FormGroup } from '@angular/forms';

class A {
  form: FormGroup;
}

// @withDestory
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends withDestory(A) implements OnInit {

  fetching = false;
  @ViewChild(NzTableComponent) nzTable: NzTableComponent;
  // data$: Observable<{ id: number, name: string }[]>;
  data: { id: number, name: string }[];
  constructor() {
    super();
    // this.form
    of(null).pipe(
      tap(() => {
        this.fetching = true;
      }),
      delay(1000),
      map(() => [
        { id: 1, name: 'kevin' },
        { id: 2, name: 'kevin1' },
        { id: 3, name: 'kevin2' },
        { id: 4, name: 'kevin3' },
      ]),
      tap(() => this.fetching = false),
      takeUntil(this.destory$)
    ).subscribe(data => {
      this.data = data;
    });

  }

  ngOnInit(): void {
  }



}


const next = withDestory(TableComponent);
const obj = new next();
// obj.fetching
