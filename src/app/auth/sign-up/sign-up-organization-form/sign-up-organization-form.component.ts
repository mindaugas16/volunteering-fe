import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up-organization-form',
  templateUrl: './sign-up-organization-form.component.html',
  styleUrls: ['./sign-up-organization-form.component.scss']
})
export class SignUpOrganizationFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() formSubmit: EventEmitter<void> = new EventEmitter();
  @Output() goBack: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.formSubmit.emit();
  }

  onBack() {
    this.goBack.emit();
  }
}
