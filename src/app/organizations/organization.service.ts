import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationInterface, UpdateOrganizationInterface } from './organization.interface';

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
              firstName
              lastName
              description
              location {
                address
                city
                country
              }
              members {
                _id
                firstName
              }
              events {
                _id
                title
                date {
                  start
                  end
                }
                createdAt
                updatedAt
                imagePath
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

  update(id: string, updatedOrganization: UpdateOrganizationInterface): Observable<OrganizationInterface> {
    return this.apiService.query({
      query: `
        mutation updateOrganization($id: ID!, $organizationInput: OrganizationInput!) {
          updateOrganization(id: $id, organizationInput: $organizationInput) {
            name
          }
        }
      `,
      variables: {
        id,
        organizationInput: updatedOrganization
      }
    });
  }
}
