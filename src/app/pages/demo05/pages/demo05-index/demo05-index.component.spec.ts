import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Demo05IndexComponent } from './demo05-index.component';

describe('Demo05IndexComponent', () => {
  let component: Demo05IndexComponent;
  let fixture: ComponentFixture<Demo05IndexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo05IndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo05IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
