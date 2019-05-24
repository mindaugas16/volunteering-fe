import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../auth/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { AuthService } from '../../auth/auth.service';
import { PasswordValidator } from '../../auth/validators/password.validator';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {
  @Input() user: UserInterface;
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
  });
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, PasswordValidator.strong]),
    repeatPassword: new FormControl(null, [Validators.required]),
  });
  failureMessage: string;
  isChangesSaved: boolean;

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private headerMessage: HeaderMessageService
  ) {
  }

  ngOnInit() {
    if (this.user) {
      this.pathValueForm();
      return;
    }
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.pathValueForm();
    });
  }

  onSaveChanges() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    const {email, ...rest} = this.form.value;
    this.profileService.updateUserInfo(rest).subscribe(() => {
      this.isChangesSaved = true;
    }, error => {
      this.failureMessage = error.message;
      FormControlsHelperService.invalidateControlsByErrors(this.form, error.data);
    });
  }

  private pathValueForm() {
    this.form.patchValue({
      ...this.user
    });
  }

  onResetChanges() {
    this.pathValueForm();
  }

  onChangePassword() {
    if (this.changePasswordForm.invalid) {
      FormControlsHelperService.invalidateFormControls(this.changePasswordForm);
      return;
    }

    this.profileService.changePassword(this.changePasswordForm.value).subscribe(() => {
      this.headerMessage.show('Password changed successfully', 'SUCCESS');
      this.changePasswordForm.reset({
        oldPassword: null,
        newPassword: null,
        repeatPassword: null,
      });
    }, error => {
      FormControlsHelperService.invalidateControlsByErrors(this.changePasswordForm, error.data);
    });
  }

}
