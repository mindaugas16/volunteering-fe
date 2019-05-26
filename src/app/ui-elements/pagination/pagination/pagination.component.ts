import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() type: 'SIMPLE' | 'ROUTE' = 'SIMPLE';
  @Input() totalCount: number;
  @Input() perPage = 12;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  currentPage = 1;
  pages: number[];

  constructor(private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    const arrayLength = Math.floor(this.totalCount / this.perPage); // get integer value of pages count
    this.pages = Array.from({length: arrayLength}, (v, k) => k + 1); // create array of pages and increment values
    this.route.queryParams.pipe(
      filter(({page}) => !!page)
    ).subscribe(({page}) => {
      this.currentPage = +page;
    });
  }

  onPageChange(page) {
    if (this.type === 'ROUTE') {
      this.router.navigate([], {relativeTo: this.route, queryParamsHandling: 'merge', queryParams: {page}});
    }
    this.pageChange.emit(this.currentPage);
  }

  onPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange(this.currentPage);
    }
  }

  onNext() {
    this.currentPage++;
    this.onPageChange(this.currentPage);
  }

}
