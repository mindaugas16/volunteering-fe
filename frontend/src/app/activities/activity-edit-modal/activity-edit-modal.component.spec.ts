import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEditModalComponent } from './activity-edit-modal.component';

describe('ActivityEditModalComponent', () => {
  let component: ActivityEditModalComponent;
  let fixture: ComponentFixture<ActivityEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
