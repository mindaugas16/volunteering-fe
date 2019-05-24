import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardVolunteersComponent } from './reward-volunteers.component';

describe('RewardVolunteersComponent', () => {
  let component: RewardVolunteersComponent;
  let fixture: ComponentFixture<RewardVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
