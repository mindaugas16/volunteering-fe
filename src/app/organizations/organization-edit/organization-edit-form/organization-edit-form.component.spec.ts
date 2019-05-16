import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEditFormComponent } from './organization-edit-form.component';

describe('OrganizationEditFormComponent', () => {
  let component: OrganizationEditFormComponent;
  let fixture: ComponentFixture<OrganizationEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
