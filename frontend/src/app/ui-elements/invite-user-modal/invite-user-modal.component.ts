import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHelper } from '../../auth/helpers/auth.helper';

@Component({
  selector: 'app-invite-user-modal',
  templateUrl: './invite-user-modal.component.html',
  styleUrls: ['./invite-user-modal.component.scss']
})
export class InviteUserModalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.form.valid) {
      AuthHelper.invalidateFormControls(this.form);
      return;
    }

    console.log(this.form.value);
  }
}
