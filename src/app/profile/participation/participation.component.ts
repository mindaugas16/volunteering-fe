import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Router } from '@angular/router';
import { EventInterface } from '../../events/event/models/event.interface';
import { ActivityInterface } from '../../activities/models/activity.interface';
import { EventDateStatusHelper } from '../../core/services/helpers/event-date-status.helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { switchMap } from 'rxjs/operators';
import { ActivitiesService } from '../../activities/activities.service';
import { ParticipationInterface } from '../../shared/models/participation.interface';
import { UserService } from '../../core/services/user/user.service';

const colors: any = {
  soon: {
    primary: '#209cee'
  },
  started: {
    primary: '#00d1b2'
  },
  finished: {
    primary: '#23d160'
  }
};

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  groupedEvents: EventInterface[] = [];
  loading = true;

  constructor(private userService: UserService,
              private router: Router,
              private eventDateStatusHelper: EventDateStatusHelper,
              private modalService: NgbModal,
              private activitiesService: ActivitiesService
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    const getColorByDate = (date) => {
      switch (this.eventDateStatusHelper.getEventStatusByDate(date).status) {
        case 0:
          return colors.soon;
        case 1:
          return colors.started;
        case 2:
          return colors.finished;
      }
    };

    this.userService.getCurrentUserParticipation()
      .subscribe(participation => {
        this.events = participation.map(part => {
          return {
            start: startOfDay(new Date(part.activity.date.start)),
            end: startOfDay(new Date(part.activity.date.end)),
            title: part.activity.name,
            _id: part.activity.event._id,
            color: getColorByDate(part.activity.date)
          };
        });
        this.groupedEvents = this.groupParticipationByEvent(participation);
        this.loading = false;
      });
  }

  private groupParticipationByEvent(participation): EventInterface[] {
    return participation.reduce((acc: EventInterface[], part) => {
      const found = acc.find(e => e._id === part.activity.event._id);
      if (found) {
        found.activities.push(part.activity);
      } else {
        acc.push({...part.activity.event, activities: [part.activity]});
      }
      return acc;
    }, []);
  }

  onEvent(event) {
    this.router.navigate(['/events', 'details', event._id]);
  }

  onActivity(activity: ActivityInterface) {
    this.viewDate = new Date(activity.date.start);
  }

  onDelete(event: EventInterface, activity: ActivityInterface, participation: ParticipationInterface) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.title = `Confirm`;
    modalRef.componentInstance.message = `Do you really want to sign out from <b>${event.title}</b> activity - <b>${activity.name}</b>?`;
    modalRef.componentInstance.confirmType = 'DELETE';
    modalRef.componentInstance.confirm.pipe(
      switchMap(() => this.activitiesService.deleteParticipation(activity._id))
    )
      .subscribe(() => this.loadData());
  }
}
