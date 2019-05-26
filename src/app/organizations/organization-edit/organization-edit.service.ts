import { Injectable } from '@angular/core';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { OrganizationInterface, UpdateOrganizationInterface } from '../organization.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../organization.service';
import { Observable, of } from 'rxjs';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { UploaderService } from '../../ui-elements/upload-image/uploader.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationEditService {
  private form: FormGroup;

  constructor(private organizationService: OrganizationService,
              private headerMessageService: HeaderMessageService,
              private uploaderService: UploaderService
  ) {
  }

  createForm(organization: OrganizationInterface): FormGroup {
    this.form = new FormGroup({
      organizationLogo: new FormControl(null),
      general: new FormGroup({
        organizationName: new FormControl(organization.organizationName, Validators.required),
        description: new FormControl(organization.description, Validators.maxLength(500)),
        organizationWebsite: new FormControl(organization.organizationWebsite),
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
    return new Observable(observer => {
      if (this.form.invalid) {
        FormControlsHelperService.invalidateFormControls(this.form);
        this.headerMessageService.show('Form is invalid. Please check errors in form', 'DANGER');
        observer.error('Invalid form');
      }

      const organization: UpdateOrganizationInterface = {
        organizationName: this.form.value.general.organizationName,
        organizationWebsite: this.form.value.general.organizationWebsite,
        description: this.form.value.general.description,
        location: this.form.value.location
      };

      let observable = of(null);

      if (this.form.value.organizationLogo) {
        observable = this.uploaderService.upload(this.form.value.organizationLogo);
      }

      observable.pipe(
        switchMap(organizationLogo => this.organizationService.update({organizationLogo, ...organization}))
      ).subscribe(res => {
        this.headerMessageService.show('Organization details updated successfully', 'SUCCESS');
        observer.next(res);
        observer.complete();
      }, (error) => observer.error(error));
    });
  }
}
