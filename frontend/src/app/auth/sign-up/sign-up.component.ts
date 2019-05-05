import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { UserType } from '../../profile/user-type.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userTypes = [
    {id: UserType.VOLUNTEER, title: 'Volunteer', description: 'Lorem ipsum and bla bla bla'},
    {id: UserType.ORGANIZATION, title: 'Organization', description: 'Lorem ipsum and bla bla bla'},
    {id: UserType.SPONSOR, title: 'Sponsor', description: 'Lorem ipsum and bla bla bla'},
  ];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  onSelectType(id: number) {
    const modalRef = this.modalService.open(SignUpFormComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.userType = id;
  }
}
