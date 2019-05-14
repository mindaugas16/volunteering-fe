import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListCardComponent } from './events-list-card.component';

describe('EventsListCardComponent', () => {
  let component: EventsListCardComponent;
  let fixture: ComponentFixture<EventsListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
