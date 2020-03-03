import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, catchError, startWith, share, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-demo03',
  templateUrl: './demo03.component.html',
  styleUrls: ['./demo03.component.scss']
})
export class Demo03Component implements OnInit, AfterViewInit {

  @ViewChild('foo') foo: ElementRef<HTMLDivElement>;
  // t$: Observable<boolean>;
  t$ = new Subject<boolean>();
  constructor(private router: Router) {
    // this.route.snapshot.url
    this.router.events.pipe(
      startWith(true),
      filter(event => event instanceof NavigationEnd),
      map(event => {
        console.log(event);
        return true;
      }),
    ).subscribe(this.t$);

    // this.t$.subscribe(console.log);
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.foo);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.foo);
  }


}
