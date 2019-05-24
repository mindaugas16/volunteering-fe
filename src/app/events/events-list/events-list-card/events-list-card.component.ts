import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from '../../event/models/event.interface';
import { ActionsRules } from '../../../shared/permissions.config';

@Component({
  selector: 'app-events-list-card',
  templateUrl: './events-list-card.component.html',
  styleUrls: ['./events-list-card.component.scss']
})
export class EventsListCardComponent implements OnInit {
  @Input() event: EventInterface;
  actionsRules = ActionsRules;

  constructor() {
  }

  ngOnInit() {
  }

}
