import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/events.service';
import { EventInterface } from '../models/event.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagInterface } from '../../ui-elements/tag/tag.interface';

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

  onRenameTag(tag: TagInterface) {
    if (tag.label) {
      const found = this.event.tags.find(({id}) => id === tag.id);
      if (found) {
        found.label = tag.label;
      }
      return;
    }
    this.onDeleteTag(tag.id);
  }

  onAddTag() {
    this.isTagsEditEnabled = true;
    this.event.tags.push({id: this.event.tags[this.event.tags.length - 1].id + 1, label: null});
  }

  onSaveTags() {
    this.eventsService.update(this.event._id, this.event).subscribe(r => {
      console.log(r);
    });
  }
}
