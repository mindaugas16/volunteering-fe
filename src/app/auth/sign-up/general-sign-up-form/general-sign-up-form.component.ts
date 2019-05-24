import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserRole } from '../../../profile/user-type.enum';

@Component({
  selector: 'app-general-sign-up-form',
  templateUrl: './general-sign-up-form.component.html',
  styleUrls: ['./general-sign-up-form.component.scss']
})
export class GeneralSignUpFormComponent implements OnInit {
  @Input() userType: UserRole;
  @Input() form: FormGroup;
  @Output() formContinue: EventEmitter<void> = new EventEmitter();
  @Output() goBack: EventEmitter<void> = new EventEmitter();

  userRole = UserRole;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.formContinue.emit();
  }

  onBack() {
    this.goBack.emit();
  }
}
