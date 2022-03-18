import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo06',
  templateUrl: './demo06.component.html',
  styleUrls: ['./demo06.component.scss']
})
export class Demo06Component implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.http.post('/lms/api/v1/login', {
      username: 'admin',
      password: 'password'
    }).subscribe();
  }

}
