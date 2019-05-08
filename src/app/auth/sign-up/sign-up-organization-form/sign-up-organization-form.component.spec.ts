import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrganizationFormComponent } from './sign-up-organization-form.component';

describe('SignUpOrganizationFormComponent', () => {
  let component: SignUpOrganizationFormComponent;
  let fixture: ComponentFixture<SignUpOrganizationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpOrganizationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
