import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { AuthService } from '../../auth/auth.service';
import { zip } from 'rxjs/internal/observable/zip';
import { UserInterface } from '../../auth/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEditComponent } from '../../events/event-edit/event-edit.component';
import { ActionsRules } from '../../shared/permissions.config';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { OrganizationEditModalComponent } from '../organization-edit/organization-edit-modal/organization-edit-modal.component';

@Component({
  selector: 'app-organization-inner',
  templateUrl: './organization-inner.component.html',
  styleUrls: ['./organization-inner.component.scss']
})
export class OrganizationInnerComponent implements OnInit {
  organization: OrganizationInterface;
  isUserJoinedOrganization: boolean;
  user: UserInterface;
  actionsRules = ActionsRules;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private headerMessageService: HeaderMessageService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return zip(this.organizationService.getOrganization(params['id']), this.authService.getCurrentUser(false));
      })
    ).subscribe(([organization, user]) => {
      this.organization = organization;
      this.organization.events.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      if (user) {
        this.isUserJoinedOrganization = !!this.organization.members.find(member => member._id === user._id);
        this.user = user;
      }
    });
  }

  toggleOrganizationJoin() {
    if (!this.user) {
      this.router.navigate(['/auth']);
      return;
    }

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
    const modalRef = this.modalService.open(EventEditComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.organization = this.organization;
    modalRef.componentInstance.eventChange.subscribe(event => {
      this.organization.events = [event, ...this.organization.events];
    });
  }

  onEditDetails() {
    const modalRef = this.modalService.open(OrganizationEditModalComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.organization = this.organization;
    modalRef.componentInstance.update.subscribe(organization => {
      this.organization = {...this.organization, ...organization};
      this.headerMessageService.show('Organization details updated successfully', 'SUCCESS');
    });
  }

  onUserInvite() {
  }
}
