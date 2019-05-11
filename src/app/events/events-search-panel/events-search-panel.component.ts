import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsSearchService } from '../services/events-search/events-search.service';

@Component({
  selector: 'app-events-search-panel',
  templateUrl: './events-search-panel.component.html',
  styleUrls: ['./events-search-panel.component.scss']
})
export class EventsSearchPanelComponent implements OnInit {
  form: FormGroup = new FormGroup({
    query: new FormControl('')
  });

  constructor(private eventsSearchService: EventsSearchService) {
  }

  ngOnInit() {
    this.eventsSearchService.getSearchQueryAsObservable().subscribe(query => {
      this.form.patchValue({query});
    });
  }

  onSearch() {
    this.eventsSearchService.search(this.form.value.query);
  }

}