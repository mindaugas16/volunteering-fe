import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsSearchService {
  private query: ReplaySubject<string> = new ReplaySubject(1);

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.route.queryParams.pipe(take(1)).subscribe(({query}) => {
      this.search(query || '');
    });
  }

  search(query: string) {
    this.query.next(query);
    this.router.navigate([], {queryParams: {query: query || null}, relativeTo: this.route, queryParamsHandling: 'merge'});
  }

  getSearchQueryAsObservable(): Observable<string> {
    return this.query.asObservable();
  }
}
