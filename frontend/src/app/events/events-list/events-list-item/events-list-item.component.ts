import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from '../../../event/models/event.interface';

@Component({
  selector: 'app-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss']
})
export class EventsListItemComponent implements OnInit {
  @Input() event: EventInterface;

  constructor() {
  }

  ngOnInit() {
  }

}
