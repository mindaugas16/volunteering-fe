import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const IMAGE_PLACEHOLDER = 'https://www.cidempanama.org/files/2019/04/import_placeholder-19.png';

@Injectable({
  providedIn: 'root'
})
export class ImagePathFormatterService {
  constructor() {}

  static format(imagePath) {
    if (imagePath) {
      return `${environment.api}assets/images/${imagePath}`;
    }
    return IMAGE_PLACEHOLDER;
  }
}
