import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStatusLabelComponent } from './event-status-label.component';

describe('EventStatusLabelComponent', () => {
  let component: EventStatusLabelComponent;
  let fixture: ComponentFixture<EventStatusLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStatusLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStatusLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
