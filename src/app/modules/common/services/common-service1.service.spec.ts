import { TestBed } from '@angular/core/testing';

import { CommonService1Service } from './common-service1.service';

describe('CommonService1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonService1Service = TestBed.inject<CommonService1Service>(CommonService1Service);
    expect(service).toBeTruthy();
  });
});
