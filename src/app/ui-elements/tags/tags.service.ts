import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private apiService: ApiService) {
  }

  getRelatedTags() {
    return this.apiService.query({
      query: `
        query relatedTags {
            relatedTags {
              _id
              label
            }
          }
        `
    }).pipe(
      map(({data}) => data.relatedTags)
    );
  }
}
