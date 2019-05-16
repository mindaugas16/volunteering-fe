import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onFind() {
    this.router.navigate(['events'], {queryParams: {...this.form.value}});
  }

}
