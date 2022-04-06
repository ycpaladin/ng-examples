import { Component, OnInit } from '@angular/core';
import { User } from 'projects/core/src/public-api';

@Component({
  selector: 'app-demo06',
  templateUrl: './demo06.component.html',
  styleUrls: ['./demo06.component.scss']
})
export class Demo06Component implements OnInit {

  constructor(public user: User) { }

  ngOnInit(): void {
    // this.http.post('/lms/api/v1/login', {
    //   username: 'admin',
    //   password: 'password'
    // }).subscribe();
    this.user.login('admin', 'password');
    this.user.subscribe(v => {
      console.log('==>', v)
    })
  }

}
