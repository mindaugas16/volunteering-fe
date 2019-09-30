import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsSearchService } from '../../events/services/events-search/events-search.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  form: FormGroup = new FormGroup({
    query: new FormControl(null),
    location: new FormControl(null),
    type: new FormControl(1)
  });

  constructor(private router: Router, private eventsSearchService: EventsSearchService) {
  }

  ngOnInit() {
  }

  onFind() {
    const {query, location} = this.form.value;
    const params = {query, location};

    let route;
    switch (+this.form.controls['type'].value) {
      case 1:
        route = 'events';
        this.eventsSearchService.setParams(params);
        break;
      case 2:
        route = 'activities';
        break;
      case 3:
        route = 'organizations';
        break;
      default:
        route = 'events';
    }

    this.router.navigate([route], {queryParams: params});
  }

}
