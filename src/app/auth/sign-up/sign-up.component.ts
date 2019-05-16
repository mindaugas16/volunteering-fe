import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '../../profile/user-type.enum';
import { SignUpVolunteerFormComponent } from './sign-up-volunteer-form/sign-up-volunteer-form.component';
import { SignUpOrganizationFormComponent } from './sign-up-organization-form/sign-up-organization-form.component';
import { SignUpSponsorFormComponent } from './sign-up-sponsor-form/sign-up-sponsor-form.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userTypes = [
    {id: UserRole.VOLUNTEER, title: 'Volunteer', description: 'Lorem ipsum and bla bla bla'},
    {id: UserRole.ORGANIZATION, title: 'Organization', description: 'Lorem ipsum and bla bla bla'},
    {id: UserRole.SPONSOR, title: 'Sponsor', description: 'Lorem ipsum and bla bla bla'},
  ];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  onSelectType(id: UserRole) {
    let component = null;
    switch (id) {
      case UserRole.VOLUNTEER:
        component = SignUpVolunteerFormComponent;
        break;
      case UserRole.ORGANIZATION:
        component = SignUpOrganizationFormComponent;
        break;
      case UserRole.SPONSOR:
        component = SignUpSponsorFormComponent;
        break;
    }
    const modalRef = this.modalService.open(component, {windowClass: 'modal is-active'});
    modalRef.componentInstance.userType = id;
  }
}
