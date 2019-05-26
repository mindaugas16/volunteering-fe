import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationListCardComponent } from './organization-list-card.component';

describe('OrganizationListCardComponent', () => {
  let component: OrganizationListCardComponent;
  let fixture: ComponentFixture<OrganizationListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
