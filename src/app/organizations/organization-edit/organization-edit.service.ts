import { Injectable } from '@angular/core';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { OrganizationInterface, UpdateOrganizationInterface } from '../organization.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../organization.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationEditService {
  private form: FormGroup;

  constructor(private organizationService: OrganizationService) {
  }

  createForm(organization: OrganizationInterface): FormGroup {
    this.form = new FormGroup({
      general: new FormGroup({
        name: new FormControl(organization.name, Validators.required),
        description: new FormControl(organization.description, Validators.maxLength(500))
      }),
      location: new FormGroup({
        address: new FormControl(organization.location ? organization.location.address : null),
        title: new FormControl(organization.location ? organization.location.title : null),
        city: new FormControl(organization.location ? organization.location.city : null),
        country: new FormControl(organization.location ? organization.location.country : null),
        zipCode: new FormControl(organization.location ? organization.location.zipCode : null),
      })
    });

    return this.form;
  }

  update(): Observable<any> {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }

    return new Observable(observer => {
      const organization: UpdateOrganizationInterface = {
        name: this.form.value.general.name,
        description: this.form.value.general.description,
        location: this.form.value.location
      };

      this.organizationService.update(organization).subscribe(res => {
        observer.next(res);
        observer.complete();
      }, (error) => observer.error(error));
    });
  }
}
