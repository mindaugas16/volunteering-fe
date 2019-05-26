import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
      switchMap(query => {
        this.loading = true;
        const {page, ...rest} = query;
        return this.organizationService.getOrganizations({page: +page, ...rest});
      })
    ).subscribe(({organizations, totalCount}) => {
      this.totalCount = totalCount;
      this.organizations = organizations;
      this.loading = false;
    }, () => this.loading = false);
  }

}
