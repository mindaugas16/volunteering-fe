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
  eventDateStatusLabels = [];

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    const convertDate = (date?) => {
      if (!date) {
        return new Date().setHours(0, 0, 0, 0);
      }
      return new Date(date).setHours(0, 0, 0, 0);
    };

    this.route.params.pipe(
      switchMap(params => {
        return this.eventsService.getEvent(params['id']);
      })
    ).subscribe(event => {
      this.event = event;
      this.eventDateStatusLabels = [
        {
          extraClass: 'is-info', name: 'Soon', condition: convertDate(this.event.date.start) > convertDate()
        },
        {
          extraClass: 'is-primary',
          name: 'Happening',
          condition: convertDate(this.event.date.start) <= convertDate() && convertDate() <= convertDate(this.event.date.end)
        },
        {
          extraClass: 'is-success', name: 'Finished', condition: convertDate() > convertDate(this.event.date.end)
        },
      ];
    });

    this.authService.getCurrentUser(false).subscribe(user => this.user = user);
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
}
