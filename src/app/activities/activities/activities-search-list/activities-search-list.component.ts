import { Component, Input, OnInit } from '@angular/core';
import { ActivityInterface } from '../../models/activity.interface';

@Component({
  selector: 'app-activities-search-list',
  templateUrl: './activities-search-list.component.html',
  styleUrls: ['./activities-search-list.component.scss']
})
export class ActivitiesSearchListComponent implements OnInit {
  @Input() loading: boolean = true;
  @Input() activities: ActivityInterface[];

  constructor() {
  }

  ngOnInit() {
  }

}
