import { TestBed } from '@angular/core/testing';

import { MicroFrontService } from './micro-front.service';

describe('MicroFrontService', () => {
  let service: MicroFrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroFrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
