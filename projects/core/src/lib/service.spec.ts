import { TestBed } from '@angular/core/testing';

import { User as UserSubject } from './service';
import { User } from './base';
import { SafeType } from './interfaces';
import { USER_SERVICE } from './token';
import { of } from 'rxjs';

describe('CoreService', () => {
  let service: UserSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserSubject,
        {
          provide: USER_SERVICE, useValue: {
            login(username: string, password: string, exatr: SafeType) {
              return of({ id: 1, username: 'chenke', desplay_anme: 'chenke' })
            },
            logout() {
              return of(true)
            }
          }
        },
      ]
    });
    service = TestBed.inject(UserSubject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    // expectAsync(service.login('', '', {})).to
    // ex
  })
});
