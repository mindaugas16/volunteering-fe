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
  selectedOrganizations: string[] = [];
  selectedTags: string[] = [];
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
      filter(params => !!params)
    ).subscribe(({organizations, tags}) => {
      if (organizations) {
        this.selectedOrganizations = organizations.split(',');
      }
      if (tags) {
        this.selectedTags = tags.split(',');
      }
    });
    zip(this.tagsService.getRelatedTags(), this.organizationService.getOrganizations())
      .subscribe(([tags, organizations]) => {
        this.relatedTags = tags;
        this.organizations = organizations;
        this.loading = false;
      });
  }

  onOrganizationSelect(name: string) {
    this.toggleSelect(this.selectedOrganizations, name, 'organizations');
  }

  onTagSelect(label: string) {
    this.toggleSelect(this.selectedTags, label, 'tags');
  }

  private toggleSelect(selectedValues: any[], label: string, queryParamKey: string) {
    const foundIndex = selectedValues.indexOf(label);
    if (foundIndex > -1) {
      selectedValues.splice(foundIndex, 1);
    } else {
      selectedValues.push(label);
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        [queryParamKey]: selectedValues.toString() || null,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  isSelected(array: any[], key: string | number): boolean {
    return array.indexOf(key) > -1;
  }

}
