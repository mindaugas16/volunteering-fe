import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events-search-panel',
  templateUrl: './events-search-panel.component.html',
  styleUrls: ['./events-search-panel.component.scss']
})
export class EventsSearchPanelComponent implements OnInit {
  form: FormGroup = new FormGroup({
    query: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {
  }

}
