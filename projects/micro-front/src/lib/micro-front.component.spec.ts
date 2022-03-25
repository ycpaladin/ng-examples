import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroFrontComponent } from './micro-front.component';

describe('MicroFrontComponent', () => {
  let component: MicroFrontComponent;
  let fixture: ComponentFixture<MicroFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
