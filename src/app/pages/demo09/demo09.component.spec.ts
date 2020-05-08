import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo09Component } from './demo09.component';

describe('Demo09Component', () => {
  let component: Demo09Component;
  let fixture: ComponentFixture<Demo09Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
