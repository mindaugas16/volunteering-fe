import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';

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
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }

    console.log(this.form.value);
  }
}
