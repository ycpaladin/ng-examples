import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPageLayoutComponent } from './basic-page-layout.component';

describe('BasicPageLayoutComponent', () => {
  let component: BasicPageLayoutComponent;
  let fixture: ComponentFixture<BasicPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
