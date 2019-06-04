import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ImagePathFormatterService } from '../../../core/services/helpers/image-path-formatter.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnChanges {
  @Input() imagePath: string;
  @Input() extraClasses: string[];

  constructor() {
  }

  ngOnChanges() {
    this.imagePath = ImagePathFormatterService.format(this.imagePath);
  }

}
