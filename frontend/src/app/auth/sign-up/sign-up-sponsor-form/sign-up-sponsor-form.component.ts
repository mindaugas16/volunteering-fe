import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControlsHelperService } from '../../../core/services/helpers/form-controls-helper.service';

@Component({
  selector: 'app-sign-up-sponsor-form',
  templateUrl: './sign-up-sponsor-form.component.html',
  styleUrls: ['./sign-up-sponsor-form.component.scss']
})
export class SignUpSponsorFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
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

  submit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    const {termsAndConditions, ...rest} = this.form.value;
    this.authService.signUp(rest).subscribe(() => {
        this.activeModal.close();
        this.router.navigate(['/auth', 'sign-in']);
      },
      error => {
        FormControlsHelperService.invalidateControlsByErrors(this.form, error.data);
      }
    );
  }
}
