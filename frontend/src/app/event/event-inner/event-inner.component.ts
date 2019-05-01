import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/events.service';
import { EventInterface } from '../models/event.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-inner',
  templateUrl: './event-inner.component.html',
  styleUrls: ['./event-inner.component.scss']
})
export class EventInnerComponent implements OnInit {
  event: EventInterface;
  isTagsEditEnabled: boolean;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.eventsService.getEvent(params['id']);
      })
    ).subscribe(event => {
      this.event = event;
      this.event.tags = [
        {id: 0, label: 'volunteer'},
        {id: 1, label: 'su_image'},
        {id: 2, label: 'kazkas'},
        {id: 3, label: 'dar_vienas'},
        {id: 4, label: 'organization_kul'},
      ];
      console.log(this.event);
    });
  }

  onEditDetails() {
    const modalRef = this.modalService.open(EventEditComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.eventChange.subscribe(event => {
      this.event = {...this.event, ...event};
    });
  }

  onDeleteTag(id: number) {
    const foundIndex = this.event.tags.findIndex(tag => tag.id === id);
    if (foundIndex > -1) {
      this.event.tags.splice(foundIndex, 1);
    }
  }
}
