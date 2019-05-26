import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlsHelperService } from '../../../core/services/helpers/form-controls-helper.service';

@Component({
  selector: 'app-sign-up-sponsor-form',
  templateUrl: './sign-up-sponsor-form.component.html',
  styleUrls: ['./sign-up-sponsor-form.component.scss']
})
export class SignUpSponsorFormComponent implements OnInit {
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
