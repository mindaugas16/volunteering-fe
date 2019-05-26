import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSearchPanelComponent } from './organization-search-panel.component';

describe('OrganizationSearchPanelComponent', () => {
  let component: OrganizationSearchPanelComponent;
  let fixture: ComponentFixture<OrganizationSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
