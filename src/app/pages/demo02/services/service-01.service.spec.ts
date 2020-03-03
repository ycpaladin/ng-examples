import { TestBed } from '@angular/core/testing';

import { Service01Service } from './service-01.service';

describe('Service01Service', () => {
  let service: Service01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
