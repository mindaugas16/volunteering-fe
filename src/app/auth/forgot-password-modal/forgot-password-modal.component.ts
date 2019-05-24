import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required])
  });

  constructor(private activeModal: NgbActiveModal,
              private headerMessage: HeaderMessageService,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    this.authService.requestResetToken(this.form.value.email).subscribe(() => {
      this.activeModal.close();
      this.headerMessage.show('Password reset form was sent to your email', 'SUCCESS');
    });
  }

  onCancel() {
    this.activeModal.close();
  }

}
