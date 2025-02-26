import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SortInterface {
  sort: string;
  order: 'asc' | 'desc';
}

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Input() sort: SortInterface;
  @Input() sortItems: {value: string, label: string};
  @Output() sortChange: EventEmitter<any> = new EventEmitter();

  selected: SortInterface;

  constructor() {
  }

  ngOnInit() {
    this.selected = this.sort || {sort: this.sortItems[0].value, order: 'asc'};
  }

  onOrderChange(): void {
    this.selected.order = this.selected.order === 'asc' ? 'desc' : 'asc';
    this.onSortChange();
  }

  onSortChange() {
    const {sort, order} = this.selected;
    const orderBy = `${order === 'asc' ? '+' : '-'}${sort}`;
    this.sortChange.emit(orderBy);
  }

}
