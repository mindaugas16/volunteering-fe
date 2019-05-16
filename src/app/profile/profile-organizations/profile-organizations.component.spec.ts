import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrganizationsComponent } from './profile-organizations.component';

describe('ProfileOrganizationsComponent', () => {
  let component: ProfileOrganizationsComponent;
  let fixture: ComponentFixture<ProfileOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
