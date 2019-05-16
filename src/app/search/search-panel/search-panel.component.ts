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
    let route = 'events';
    if (+this.form.controls['type'].value === 2) {
      route = 'organizations';
    }
    this.router.navigate([route], {queryParams: {...this.form.value}});
  }

}
