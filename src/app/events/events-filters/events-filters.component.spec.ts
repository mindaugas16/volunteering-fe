import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsFiltersComponent } from './events-filters.component';

describe('EventsFiltersComponent', () => {
  let component: EventsFiltersComponent;
  let fixture: ComponentFixture<EventsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
