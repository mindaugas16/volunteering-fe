import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { AuthService } from '../../auth/auth.service';
import { zip } from 'rxjs/internal/observable/zip';
import { UserInterface } from '../../auth/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionsRules } from '../../shared/permissions.config';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { OrganizationEditModalComponent } from '../organization-edit/organization-edit-modal/organization-edit-modal.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

const ORGANIZATION_EVENTS_PER_PAGE = 8;

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
  eventsPerPage = ORGANIZATION_EVENTS_PER_PAGE;

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
        return zip(
          this.organizationService.getOrganization(params['id']),
          this.authService.getCurrentUser(false)
        );
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
      const modalRef = this.modalService.open(ConfirmModalComponent, {windowClass: 'modal is-active'});
      modalRef.componentInstance.title = `Confirm`;
      modalRef.componentInstance.options = {
        cssClasses: 'is-danger',
        submitButtonText: 'Leave'
      };
      modalRef.componentInstance.message = `Are you really want to leave organization <b>${this.organization.organizationName}</b>?`;
      modalRef.componentInstance.confirm
        .pipe(
          switchMap(() => this.organizationService.leaveOrganization(this.organization._id))
        )
        .subscribe(() => {
          this.isUserJoinedOrganization = false;
          this.organization.members
            .splice(
              this.organization.members.findIndex(member => member._id === this.user._id),
              1
            );
          this.headerMessageService.show('You have successfully left organization', 'SUCCESS');
        });
      return;
    }
    this.organizationService.joinOrganization(this.organization._id)
      .subscribe(() => {
        this.isUserJoinedOrganization = true;
        this.organization.members.push(this.user);
        this.headerMessageService.show('You have successfully joined organization', 'SUCCESS');
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
