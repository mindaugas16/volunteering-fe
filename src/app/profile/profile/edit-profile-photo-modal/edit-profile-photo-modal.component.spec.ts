import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePhotoModalComponent } from './edit-profile-photo-modal.component';

describe('EditProfilePhotoModalComponent', () => {
  let component: EditProfilePhotoModalComponent;
  let fixture: ComponentFixture<EditProfilePhotoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilePhotoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
