import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSignUpFormComponent } from './general-sign-up-form.component';

describe('GeneralSignUpFormComponent', () => {
  let component: GeneralSignUpFormComponent;
  let fixture: ComponentFixture<GeneralSignUpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSignUpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
