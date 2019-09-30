import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '../../profile/user-type.enum';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { CreateUserInterface } from '../user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  selectedType: UserRole;
  userTypes = [
    {id: UserRole.VOLUNTEER, title: 'Volunteer', description: 'Become a volunteer!'},
    {id: UserRole.ORGANIZATION, title: 'Organization', description: 'Create and manage volunteering opportunities!'},
    {id: UserRole.SPONSOR, title: 'Sponsor', description: 'Make events more attractive!'},
  ];
  shouldShowLastForm: boolean;
  generalForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, PasswordValidator.strong]),
    postalCode: new FormControl(null, [Validators.required]),
    termsAndConditions: new FormControl(false, [Validators.required, Validators.requiredTrue])
  });

  organizationForm: FormGroup = new FormGroup({
    organizationName: new FormControl(null, [Validators.required]),
  });

  sponsorForm: FormGroup = new FormGroup({
    sponsorName: new FormControl(null, [Validators.required])
  });

  userRole = UserRole;

  constructor(private viewportScroller: ViewportScroller,
              private authService: AuthService,
              private activeModal: NgbActiveModal,
              private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSelectType(id: UserRole) {
    this.selectedType = id;
    this.onScrollTo('generalForm');
    this.organizationForm.reset();
    this.shouldShowLastForm = false;
  }

  onScrollTo(anchor?: string) {
    if (!anchor) {
      this.viewportScroller.scrollToPosition([0, 0]);
      return;
    }
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(anchor);
    }, 0);
  }

  onSubmitLastForm() {
    let values = this.generalForm.value;
    switch (this.selectedType) {
      case UserRole.ORGANIZATION:
        values = {...values, ...this.organizationForm.value};
        break;
      case UserRole.SPONSOR:
        values = {...values, ...this.sponsorForm.value};
        break;
    }
    this.register(values);
  }

  onSubmitGeneralForm() {
    if (this.generalForm.invalid) {
      FormControlsHelperService.invalidateFormControls(this.generalForm);
      return;
    }

    if (this.selectedType === UserRole.VOLUNTEER) {
      this.register(this.generalForm.value);
      return;
    }
    this.shouldShowLastForm = true;
    this.onScrollTo('lastForm');
  }

  private register(values: CreateUserInterface) {
    let lastForm = null;

    switch (this.selectedType) {
      case UserRole.ORGANIZATION:
        lastForm = this.organizationForm;
        break;
      case UserRole.SPONSOR:
        lastForm = this.sponsorForm;
        break;
    }

    if (lastForm && lastForm.invalid) {
      FormControlsHelperService.invalidateFormControls(lastForm);
      return;
    }

    this.authService.signUp(values, this.selectedType).subscribe(() => {
        this.activeModal.close();
        this.router.navigate(['/auth', 'sign-in']);
      },
      ({error}) => {
        FormControlsHelperService.invalidateControlsByErrors(this.generalForm, error.data);
        if (lastForm) {
          FormControlsHelperService.invalidateControlsByErrors(this.organizationForm, error.data);
        }
      }
    );
  }
}
