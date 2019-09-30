import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesSearchListComponent } from './activities-search-list.component';

describe('ActivitiesSearchListComponent', () => {
  let component: ActivitiesSearchListComponent;
  let fixture: ComponentFixture<ActivitiesSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
