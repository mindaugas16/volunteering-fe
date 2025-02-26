import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventsService } from '../../events/services/events.service';
import { EventInterface } from '../../events/event/models/event.interface';
import { ActivitiesService } from '../activities.service';
import { ActivityEditModalComponent } from '../activity-edit-modal/activity-edit-modal.component';
import { DropdownItemInterface } from '../../ui-elements/dropdown/dropdown.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbInterface } from '../../ui-elements/breadcrumb/breadcrumb.interface';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { ActivityInterface } from '../models/activity.interface';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  event: EventInterface;
  dropdownActions: DropdownItemInterface[] = [
    {
      title: 'Edit',
      action: (activity) => {
        const modalRef = this.openEditModal();
        modalRef.componentInstance.event = this.event;
        modalRef.componentInstance.activity = activity;
        modalRef.componentInstance.success.subscribe(act => {
          const foundIndex = this.event.activities.findIndex(item => item._id === act._id);
          if (foundIndex > -1) {
            this.event.activities[foundIndex] = {...this.event.activities[foundIndex], ...act};
          }
        });
      }
    },
    {
      title: 'Remove',
      action: (activity: ActivityInterface) => {
        const modalRef = this.modalService.open(ConfirmModalComponent, {windowClass: 'modal is-active'});
        modalRef.componentInstance.title = `Confirm`;
        modalRef.componentInstance.confirmType = 'DELETE';
        modalRef.componentInstance.message = `Are you really want to delete activity <b>${activity.name}</b>?`;
        modalRef.componentInstance.confirm.pipe(switchMap(() => this.activitiesService.delete(activity._id)))
          .subscribe(() => {
            this.event.activities = this.event.activities.filter(item => item._id !== activity._id);
          });
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private activitiesService: ActivitiesService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.eventsService.getEvent(params['id']);
      })
    ).subscribe(event => {
      event.activities.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      this.event = event;
    });
  }

  addActivity() {
    const modalRef = this.openEditModal();
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.success.subscribe(activity => {
      this.event.activities.push(activity);
    });
  }

  private openEditModal(): NgbModalRef {
    return this.modalService.open(ActivityEditModalComponent, {windowClass: 'modal is-active'});
  }

  getBreadcrumbItems(): BreadcrumbInterface[] {
    return [
      {title: 'Events', link: ['/events']},
      {title: this.event.title, link: ['/events', 'details', this.event._id]},
      {title: 'Activities', link: null}
    ];
  }
}
