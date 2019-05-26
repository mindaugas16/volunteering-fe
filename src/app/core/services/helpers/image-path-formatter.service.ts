import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const IMAGE_PLACEHOLDER = 'https://bulma.io/images/placeholders/1280x960.png';

@Injectable({
  providedIn: 'root'
})
export class ImagePathFormatterService {

  constructor() {
  }

  static format(imagePath) {
    if (imagePath) {
      return `${environment.apiRest}assets/images/${imagePath}`;
    }
    return IMAGE_PLACEHOLDER;
  }
}
