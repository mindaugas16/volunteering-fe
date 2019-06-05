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
  @Input() formatImage = true;

  constructor() {
  }

  ngOnChanges() {
    if (this.formatImage) {
      this.imagePath = ImagePathFormatterService.format(this.imagePath);
    }
  }

}
