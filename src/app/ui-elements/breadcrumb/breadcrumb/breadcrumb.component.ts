import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbInterface } from '../breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbInterface[] = [];

  constructor() { }

  ngOnInit() {
  }

}
