import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { FormControlsHelperService } from '../../../core/services/helpers/form-controls-helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '../../../profile/user-type.enum';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  @Input() userType: UserRole;
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    termsAndConditions: new FormControl(false, [Validators.required])
  });

  constructor(private authService: AuthService,
              private activeModal: NgbActiveModal,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    const {termsAndConditions, ...rest} = this.form.value;
    this.authService.signUp(rest, this.userType).subscribe(() => {
        this.activeModal.close();
        this.router.navigate(['/auth', 'sign-in']);
      },
      error => {
        FormControlsHelperService.invalidateControlsByErrors(this.form, error.data);
      }
    );
  }

  getFormTitle() {
    switch (this.userType) {
      case UserRole.GENERAL:
        return 'General';
      case UserRole.VOLUNTEER:
        return 'Volunteer';
      case UserRole.ORGANIZATION:
        return 'Organization';
      case UserRole.SPONSOR:
        return 'Sponsor';
    }
  }
}
