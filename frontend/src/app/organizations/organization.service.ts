import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationInterface } from './organization.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private apiService: ApiService
  ) {
  }

  getOrganizations(): Observable<OrganizationInterface[]> {
    return this.apiService.query({
      query: `
        query organizations {
           organizations {
              _id
              name
              creator {
                email
              }
              location {
                address
              }
           }
        }
      `,
    }).pipe(
      map(({data}) => data),
      map(({organizations}) => organizations),
    );
  }

  getOrganization(id: string): Observable<OrganizationInterface> {
    return this.apiService.query({
      query: `
        query organization($organizationId: ID!) {
           organization(organizationId: $organizationId) {
              _id
              name
              creator {
                email
              }
              location {
                address
              }
              members {
                _id
                firstName
              }
           }
        }
      `,
      variables: {
        organizationId: id
      }
    }).pipe(
      map(({data}) => data),
      map(({organization}) => organization),
    );
  }

  joinOrganization(id: string): Observable<boolean> {
    return this.apiService.query({
      query: `
        mutation joinOrganization($organizationId: ID!) {
          joinOrganization(organizationId: $organizationId)
        }
      `,
      variables: {
        organizationId: id
      }
    });
  }

  leaveOrganization(id: string): Observable<boolean> {
    return this.apiService.query({
      query: `
        mutation leaveOrganization($organizationId: ID!) {
          leaveOrganization(organizationId: $organizationId)
        }
      `,
      variables: {
        organizationId: id
      }
    });
  }
}
