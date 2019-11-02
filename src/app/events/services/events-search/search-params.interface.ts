import { Params } from '@angular/router';

export interface SearchParamsInterface extends Params {
  query?: string;
  location?: string;
  organizationIds?: string;
  page?: number;
  statuses?: string;
}
