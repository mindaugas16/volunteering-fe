import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControlsHelperService } from '../../../core/services/helpers/form-controls-helper.service';
import { UserRole } from '../../../profile/user-type.enum';

@Component({
  selector: 'app-sign-up-organization-form',
  templateUrl: './sign-up-organization-form.component.html',
  styleUrls: ['./sign-up-organization-form.component.scss']
})
export class SignUpOrganizationFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    termsAndConditions: new FormControl(false, [Validators.required, Validators.requiredTrue])
  });

  constructor(private authService: AuthService,
              private activeModal: NgbActiveModal,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    this.authService.signUp(this.form.value, UserRole.ORGANIZATION).subscribe(() => {
        this.activeModal.close();
        this.router.navigate(['/auth', 'sign-in']);
      },
      error => {
        FormControlsHelperService.invalidateControlsByErrors(this.form, error.data);
      }
    );
  }
}
