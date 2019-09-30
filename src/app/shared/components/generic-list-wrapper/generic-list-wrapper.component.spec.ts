import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListWrapperComponent } from './generic-list-wrapper.component';

describe('GenericListWrapperComponent', () => {
  let component: GenericListWrapperComponent;
  let fixture: ComponentFixture<GenericListWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericListWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
