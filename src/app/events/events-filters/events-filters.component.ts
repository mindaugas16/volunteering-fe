import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../ui-elements/tags/tags.service';
import { TagInterface } from '../../ui-elements/tag/tag.interface';
import { OrganizationService } from '../../organizations/organization.service';
import { zip } from 'rxjs';
import { OrganizationInterface } from '../../organizations/organization.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { isArray } from 'util';

@Component({
  selector: 'app-events-filters',
  templateUrl: './events-filters.component.html',
  styleUrls: ['./events-filters.component.scss']
})
export class EventsFiltersComponent implements OnInit {
  relatedTags: TagInterface[] = [];
  organizations: OrganizationInterface[] = [];
  selectedOrganizations: any[] = [];
  loading = true;

  constructor(private tagsService: TagsService,
              private organizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      take(1),
      filter(({organizationIds}) => !!organizationIds)
    ).subscribe(({organizationIds}) => {
      if (isArray(organizationIds)) {
        this.selectedOrganizations = organizationIds;
        return;
      }
      this.selectedOrganizations.push(organizationIds);
    });
    zip(this.tagsService.getRelatedTags(), this.organizationService.getOrganizations()).subscribe(([tags, {organizations}]) => {
      this.relatedTags = tags;
      this.organizations = organizations;
      this.loading = false;
    });
  }

  onOrganizationSelect(id: string) {
    const foundIndex = this.selectedOrganizations.indexOf(id);
    if (foundIndex > -1) {
      this.selectedOrganizations.splice(foundIndex, 1);
    } else {
      this.selectedOrganizations.push(id);
    }
    console.log(this.selectedOrganizations);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        organizationIds: this.selectedOrganizations,
        page: 1
      }
    });
  }

  isOrganizationSelected(id: string): boolean {
    return this.selectedOrganizations.indexOf(id) > -1;
  }

}
