import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { AuthService } from '../../auth/auth.service';
import { zip } from 'rxjs/internal/observable/zip';
import { UserInterface } from '../../auth/user.interface';
import { ModalService } from '../../core/services/modal/modal.service';
import { EventNewComponent } from '../../event/event-new/event-new.component';

@Component({
  selector: 'app-organization-inner',
  templateUrl: './organization-inner.component.html',
  styleUrls: ['./organization-inner.component.scss']
})
export class OrganizationInnerComponent implements OnInit {
  organization: OrganizationInterface;
  isUserJoinedOrganization: boolean;
  isOwner: boolean;
  user: UserInterface;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return zip(this.organizationService.getOrganization(params['id']), this.authService.getCurrentUser());
      })
    ).subscribe(([organization, user]) => {
      this.organization = organization;
      this.isUserJoinedOrganization = !!this.organization.members.find(member => member._id === user._id);
      this.isOwner = this.organization.creator._id === user._id;
      this.user = user;
    });
  }

  toggleOrganizationJoin() {
    if (this.isUserJoinedOrganization) {
      this.organizationService.leaveOrganization(this.organization._id).subscribe(() => {
        this.isUserJoinedOrganization = false;
        this.organization.members.splice(this.organization.members.findIndex(member => member._id === this.user._id), 1);
      });
      return;
    }
    this.organizationService.joinOrganization(this.organization._id).subscribe(() => {
      this.isUserJoinedOrganization = true;
      this.organization.members.push(this.user);
    });
  }

  onEventAdd() {
    const modalRef = this.modalService.open(EventNewComponent);
    modalRef.instance.organization = this.organization;
  }
}
