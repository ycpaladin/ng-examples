import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from 'projects/ngrx-wheel/src/lib/store';
import * as actions from './store/actions';
import { RootState } from './store/reducers';

@Component({
  selector: 'app-ngrx-test',
  templateUrl: './ngrx-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxTestComponent implements OnInit {

  data$: Observable<number[]>;

  reset(): void {
    this.store$.dispatch(new actions.ResetAction())
  }

  changeData(): void {
    this.store$.dispatch(new actions.UpdateDataAction([55, 55, 66, 77, 88]))
  }

  constructor(public store$: Store<RootState>) {
    this.data$ = this.store$.select(state => state.name.data);
  }

  ngOnInit(): void {
  }

}
