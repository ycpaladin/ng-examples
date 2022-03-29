import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorButtonCreateComponent } from './operator-button-create.component';

describe('ButtonOperatorCreateComponent', () => {
  let component: OperatorButtonCreateComponent;
  let fixture: ComponentFixture<OperatorButtonCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorButtonCreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorButtonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
