import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/services/events.service';
import { EventInterface } from '../models/event.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagInterface } from '../../ui-elements/tag/tag.interface';
import { ActionsRules } from '../../shared/permissions.config';
import { AuthService } from '../../auth/auth.service';
import { UserInterface } from '../../auth/user.interface';
import { BreadcrumbInterface } from '../../ui-elements/breadcrumb/breadcrumb.interface';
import { RewardVolunteersComponent } from '../reward-volunteers/reward-volunteers.component';
import { ActivitiesService } from '../../activities/activities.service';
import { ActivityInterface } from '../../activities/models/activity.interface';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { EventDateStatusHelper } from '../../core/services/helpers/event-date-status.helper';

@Component({
  selector: 'app-event-inner',
  templateUrl: './event-inner.component.html',
  styleUrls: ['./event-inner.component.scss']
})
export class EventInnerComponent implements OnInit {
  event: EventInterface;
  isTagsEditEnabled: boolean;
  user: UserInterface;
  actionsRules = ActionsRules;
  eventDateStatusLabel;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService,
    private activitiesService: ActivitiesService,
    private headerMessage: HeaderMessageService,
    private eventDateStatusHelper: EventDateStatusHelper
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.eventsService.getEvent(params['id']);
      })
    ).subscribe(event => {
      this.event = event;
      this.eventDateStatusLabel = this.eventDateStatusHelper.getEventStatusByDate(this.event.date);
    });

    this.authService.getCurrentUser(false).subscribe(user => this.user = user);
  }

  onJoinActivity(activity: ActivityInterface) {
    this.activitiesService.register(activity._id).subscribe(participation => {
      this.headerMessage.show(`You have successfully signed up for activity - ${activity.name}`, 'SUCCESS');
      console.log(participation);
      activity.participation.push(participation);
    });
  }

  onRewardVolunteers() {
    const modalRef = this.modalService.open(RewardVolunteersComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.event = this.event;
  }

  onEditDetails() {
    const modalRef = this.modalService.open(EventEditComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.eventChange.subscribe(event => {
      this.event = {...this.event, ...event};
    });
  }

  onAddNewTag(tag: TagInterface) {
    this.eventsService.addTags(this.event._id, tag).subscribe(newTag => {
      this.event.tags = this.event.tags.filter(({_id}) => !!_id);
      this.event.tags.push(newTag);
    });
  }

  onUpdateTag(tag: TagInterface) {
    this.eventsService.updateTag(this.event._id, tag).subscribe();
  }

  onDeleteTag(id: number) {
    this.eventsService.deleteTag(this.event._id, `${id}`).subscribe();
  }

  getBreadcrumbItems(): BreadcrumbInterface[] {
    return [{title: 'Events', link: ['/events']}, {title: this.event.title, link: null}];
  }

  isRegisteredToActivity(activity: ActivityInterface): boolean {
    return !!activity.participation.find(({volunteer}) => this.user._id === volunteer._id);
  }
}
