import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SearchParamsInterface } from './search-params.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsSearchService {
  private query: ReplaySubject<SearchParamsInterface> = new ReplaySubject(1);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.search(params as any);
    });
  }

  search(params: SearchParamsInterface, queryParamsHandling: any = 'merge') {
    this.setParams(params);
    this.router.navigate([], { queryParams: params, relativeTo: this.route, queryParamsHandling });
  }

  setParams(params: SearchParamsInterface) {
    this.query.next(params);
  }

  getSearchQueryAsObservable(): Observable<SearchParamsInterface> {
    return this.query.asObservable();
  }

  resetFilters() {
    this.search({}, '');
  }
}
