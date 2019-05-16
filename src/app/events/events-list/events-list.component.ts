import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from '../../event/models/event.interface';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  @Input() events: EventInterface[] = [];
  @Input() loading: boolean;
  @Input() viewMode: 'LIST' | 'GRID';

  constructor() {
  }

  ngOnInit(): void {
  }
}
