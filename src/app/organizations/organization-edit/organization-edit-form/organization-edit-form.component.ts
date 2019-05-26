import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrganizationInterface } from '../../organization.interface';
import { FormGroup } from '@angular/forms';
import { OrganizationEditService } from '../organization-edit.service';
import { OrganizationService } from '../../organization.service';
import { AuthService } from '../../../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organization-edit-form',
  templateUrl: './organization-edit-form.component.html',
  styleUrls: ['./organization-edit-form.component.scss']
})
export class OrganizationEditFormComponent implements OnInit {
  @Input() organization: OrganizationInterface;
  @Output() update: EventEmitter<OrganizationInterface> = new EventEmitter();
  loading: boolean;
  form: FormGroup;
  image;
  removeImage: boolean;

  constructor(private organizationEditService: OrganizationEditService,
              private organizationService: OrganizationService,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    if (!this.organization) {
      this.loading = true;
      this.authService.getCurrentUser().pipe(
        switchMap(user => {
          return this.organizationService.getOrganization(user._id);
        })
      ).subscribe(organization => {
        this.organization = organization;
        this.assignCreatedForm();
        this.loading = false;
        if (this.organization.organizationLogo) {
          this.image = this.organization.organizationLogo;
        }
      });

      return;
    }

    this.assignCreatedForm();
  }

  private assignCreatedForm() {
    this.form = this.organizationEditService.createForm(this.organization);
  }

  onImageChange(file) {
    this.form.patchValue({
      organizationLogo: file
    });
  }
}
