import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../auth/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';

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
  failureMessage: string;
  isChangesSaved: boolean;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.pathValueForm();
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

}
