import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from '../models/activity.interface';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  activities: ActivityInterface[];
  loading: boolean = true;
  meta;

  constructor(private activitiesService: ActivitiesService) {
  }

  ngOnInit() {
    this.activitiesService.getAll().subscribe(({data, meta}) => {
      this.meta = meta;
      this.activities = data;
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

}
