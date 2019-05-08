import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface, UpdateOrganizationInterface } from '../organization.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {
  organization: OrganizationInterface;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.organizationService.getOrganization(params['id']);
      })
    ).subscribe(organization => {
      this.organization = organization;
      this.form = this.createForm(this.organization);
    });
  }

  private createForm(organization: OrganizationInterface): FormGroup {
    return new FormGroup({
      general: new FormGroup({
        name: new FormControl(organization.name, Validators.required),
        description: new FormControl(organization.description, Validators.maxLength(320))
      }),
      location: new FormGroup({
        address: new FormControl(organization.location ? organization.location.address : null),
        place: new FormControl(organization.location ? organization.location.place : null),
        city: new FormControl(organization.location ? organization.location.city : null),
        country: new FormControl(organization.location ? organization.location.country : null),
        postalCode: new FormControl(organization.location ? organization.location.postalCode : null),
      })
    });
  }

  onSave() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }

    const updated: UpdateOrganizationInterface = {
      name: this.form.value.general.name,
      description: this.form.value.general.description,
      location: this.form.value.location
    };

    this.organizationService.update(this.organization._id, updated).subscribe(res => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

  onReset() {
    this.form = this.createForm(this.organization);
  }

}
