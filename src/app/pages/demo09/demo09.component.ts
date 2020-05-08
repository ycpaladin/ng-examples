import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-demo09',
  templateUrl: './demo09.component.html',
  styleUrls: ['./demo09.component.scss']
})
export class Demo09Component implements OnInit {

  data$ = new BehaviorSubject<string[]>(['1', '2', '3', '444']);
  constructor() {
    // this.data$ = of(['1', '2', '3', '444']);
  }

  close() {
    const scription$ = this.data$.subscribe(data => {
      console.log(data);
      setTimeout(() => {
        scription$.unsubscribe();
      }, 0);
    });
    this.data$.next([...this.data$.value, '123121']);

  }

  ngOnInit(): void {
    this.data$.subscribe(console.log);
  }

}
