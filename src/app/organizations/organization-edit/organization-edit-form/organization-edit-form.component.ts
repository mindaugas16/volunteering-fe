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
  form: FormGroup;
  @Input() organization: OrganizationInterface;
  @Output() update: EventEmitter<OrganizationInterface> = new EventEmitter();


  constructor(private organizationEditService: OrganizationEditService,
              private organizationService: OrganizationService,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    if (!this.organization) {
      this.authService.getCurrentUser().pipe(
        switchMap(user => {
          return this.organizationService.getOrganization(user._id);
        })
      ).subscribe(organization => {
        this.organization = organization;
        this.assignCreatedForm();
      });

      return;
    }

    this.assignCreatedForm();
  }

  private assignCreatedForm() {
    this.form = this.organizationEditService.createForm(this.organization);
  }
}
