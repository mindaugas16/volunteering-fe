import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationInnerComponent } from './organization-inner.component';

describe('OrganizationInnerComponent', () => {
  let component: OrganizationInnerComponent;
  let fixture: ComponentFixture<OrganizationInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
