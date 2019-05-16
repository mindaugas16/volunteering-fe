import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSponsorFormComponent } from './sign-up-sponsor-form.component';

describe('SignUpSponsorFormComponent', () => {
  let component: SignUpSponsorFormComponent;
  let fixture: ComponentFixture<SignUpSponsorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpSponsorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSponsorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
