import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from '../models/event.interface';

@Component({
  selector: 'app-reward-volunteers',
  templateUrl: './reward-volunteers.component.html',
  styleUrls: ['./reward-volunteers.component.scss']
})
export class RewardVolunteersComponent implements OnInit {
  @Input() event: EventInterface;

  constructor() {
  }

  ngOnInit() {
  }

}
