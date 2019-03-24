import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSearchPanelComponent } from './events-search-panel.component';

describe('EventsSearchPanelComponent', () => {
  let component: EventsSearchPanelComponent;
  let fixture: ComponentFixture<EventsSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
