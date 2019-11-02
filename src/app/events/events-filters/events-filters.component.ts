import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OrganizationInterface } from '../../organizations/organization.interface';
import { OrganizationService } from '../../organizations/organization.service';
import { TagInterface } from '../../ui-elements/tag/tag.interface';
import { TagsService } from '../../ui-elements/tags/tags.service';

type filterKeys = 'tags' | 'organizations';

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

  constructor(
    private tagsService: TagsService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        take(1),
        filter(params => !!params)
      )
      .subscribe(({ organizations, tags }) => {
        if (organizations) {
          this.selectedOrganizations = organizations.split(',');
        }
        if (tags) {
          this.selectedTags = tags.split(',');
        }
      });
    zip(this.tagsService.getRelatedTags(), this.organizationService.getOrganizations()).subscribe(
      ([tags, organizations]) => {
        this.relatedTags = tags;
        this.organizations = organizations;
        this.loading = false;
      }
    );
  }

  onOrganizationSelect(name: string) {
    this.toggleSelect(this.selectedOrganizations, 'organizations', name);
  }

  onTagSelect(label: string) {
    this.toggleSelect(this.selectedTags, 'tags', label);
  }

  onClearTags() {
    this.selectedTags = [];
    this.toggleSelect(this.selectedTags, 'tags');
  }

  onClearOrganizations() {
    this.selectedOrganizations = [];
    this.toggleSelect(this.selectedTags, 'organizations');
  }

  private toggleSelect(selectedValues: any[], queryParamKey: filterKeys, label?: string) {
    if (label) {
      const foundIndex = selectedValues.indexOf(label);
      if (foundIndex > -1) {
        selectedValues.splice(foundIndex, 1);
      } else {
        selectedValues.push(label);
      }
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
