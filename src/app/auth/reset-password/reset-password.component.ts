import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetToken: string;
  form: FormGroup = new FormGroup({
    password: new FormControl(null, Validators.required)
  });

  constructor(private activeModal: NgbActiveModal,
              private headerMessage: HeaderMessageService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(({token}) => {
      this.resetToken = token;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    this.authService.resetPassword(this.resetToken, this.form.value.password).subscribe(() => {
      this.router.navigate(['/auth/sign-in']);
      this.headerMessage.show('Password changed successfully. Now try log in.', 'SUCCESS');
    }, () => {
      this.headerMessage.show('Reset token is invalid. Please check email with password reset link and try again.', 'DANGER');
    });
  }

}
