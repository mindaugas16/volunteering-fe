import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization-search-panel',
  templateUrl: './organization-search-panel.component.html',
  styleUrls: ['./organization-search-panel.component.scss']
})
export class OrganizationSearchPanelComponent implements OnInit {
  form: FormGroup = new FormGroup({
    query: new FormControl(null, Validators.required)
  });

  constructor(private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(({query}) => {
      this.form.patchValue({query}, {emitEvent: false});
    });
    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(({query}) => {
      this.router.navigate([], {relativeTo: this.route, queryParams: {query}});
    });
  }

  onSearch() {
  }

}
