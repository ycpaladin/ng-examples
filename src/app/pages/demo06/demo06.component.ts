import { Component, OnInit } from '@angular/core';
import { User, Role } from 'core';

@Component({
  selector: 'app-demo06',
  templateUrl: './demo06.component.html',
  styleUrls: ['./demo06.component.scss']
})
export class Demo06Component implements OnInit {

  constructor(public user: User, public role: Role) { }

  ngOnInit(): void {
    this.user.login('admin', 'password');
  }

}
