import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {
  organizations: OrganizationInterface[] = [];
  totalCount: number;
  loading: boolean;

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(({page, query}) => {
        this.loading = true;
        let params = new HttpParams().append('page', page || 1);

        if (query) {
          params = params.append('query', query);
        }
        return this.organizationService.getOrganizations(params);
      })
    ).subscribe((organizations) => {
      this.totalCount = 0;
      this.organizations = organizations;
      this.loading = false;
    }, () => this.loading = false);
  }

}
