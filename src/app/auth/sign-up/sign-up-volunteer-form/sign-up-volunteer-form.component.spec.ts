import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpVolunteerFormComponent } from './sign-up-volunteer-form.component';

describe('SignUpVolunteerFormComponent', () => {
  let component: SignUpVolunteerFormComponent;
  let fixture: ComponentFixture<SignUpVolunteerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpVolunteerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpVolunteerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
