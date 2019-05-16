import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractLabelComponent } from './abstract-label.component';

describe('AbstractLabelComponent', () => {
  let component: AbstractLabelComponent;
  let fixture: ComponentFixture<AbstractLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
