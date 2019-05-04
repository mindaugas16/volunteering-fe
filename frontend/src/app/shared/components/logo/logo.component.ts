import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() imagePath: string;
  @Input() extraClasses: string[];

  constructor() {
  }

  ngOnInit() {
  }

}
