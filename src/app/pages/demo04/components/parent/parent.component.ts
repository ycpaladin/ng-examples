import { Component, OnInit, ContentChild, AfterContentInit, forwardRef } from '@angular/core';
import { Child01Component } from '../child01/child01.component';
import { Child02Component } from '../child02/child02.component';
import { IOnClick, User, IModuleComponent, ITableService } from '../../models';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  providers: [
    { provide: IModuleComponent, useValue: forwardRef(() => ParentComponent) },
  ]
})
export class ParentComponent implements OnInit, AfterContentInit, IModuleComponent<User> {


  @ContentChild(Child01Component) child01: Child01Component;
  @ContentChild('IOnClick') child02: IOnClick<User>;

  users: Observable<User[]>;

  constructor(public service: ITableService<User>) {
    this.users = this.service.getPagedData().pipe(
      map(t => t.data)
    );
  }

  ngOnInit(): void {
    console.log(this.child01, this.child02);
  }

  ngAfterContentInit(): void {
    console.log(this.child01, this.child02);
    this.users.subscribe(data => {
      this.child02.onClick(data[0]);
    });
  }

}
