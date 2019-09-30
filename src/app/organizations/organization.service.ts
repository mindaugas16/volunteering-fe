import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationInterface, OrganizationsResultsInterface, UpdateOrganizationInterface } from './organization.interface';
import { SearchParamsInterface } from '../events/services/events-search/search-params.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private apiService: ApiService
  ) {
  }

  getOrganizations(params?: SearchParamsInterface): Observable<OrganizationInterface[]> {
    return this.apiService.get('organizations', params);
  }

  getOrganization(id: string): Observable<OrganizationInterface> {
    return this.apiService.get(`organizations/${id}`);
  }

  joinOrganization(id: string): Observable<boolean> {
    return this.apiService.patch(`organizations/${id}/join`, null);
  }

  leaveOrganization(id: string): Observable<boolean> {
    return this.apiService.patch(`organizations/${id}/leave`, null);

  }

  update(updatedOrganization: UpdateOrganizationInterface): Observable<OrganizationInterface> {
    return this.apiService.query({
      query: `
        mutation updateOrganization($organizationInput: OrganizationInput!) {
          updateOrganization(organizationInput: $organizationInput) {
            organizationName
            description
            location {
              address
              city
              country
            }
          }
        }
      `,
      variables: {
        organizationInput: updatedOrganization
      }
    }).pipe(
      map(({data}) => data.updateOrganization),
    );
  }
}
