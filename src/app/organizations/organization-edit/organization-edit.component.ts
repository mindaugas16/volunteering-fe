import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface, UpdateOrganizationInterface } from '../organization.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {
  @Input() organization: OrganizationInterface;
  @Output() update: EventEmitter<OrganizationInterface> = new EventEmitter();

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.form = this.createForm(this.organization);
  }

  onSave() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }

    const organization: UpdateOrganizationInterface = {
      name: this.form.value.general.name,
      description: this.form.value.general.description,
      location: this.form.value.location
    };

    this.organizationService.update(organization).subscribe(res => {
      this.update.emit(res);
      this.onCancel();
    });
  }

  private createForm(organization: OrganizationInterface): FormGroup {
    return new FormGroup({
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
  }

  onCancel() {
    this.activeModal.close();
  }

}
