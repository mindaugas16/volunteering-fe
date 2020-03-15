import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const IMAGE_PLACEHOLDER = 'https://www.cidempanama.org/files/2019/04/import_placeholder-19.png';

@Pipe({
  name: 'imagePath',
  pure: true
})
export class ImagePathPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      return `${environment.api}assets/images/${value}`;
    }
    return IMAGE_PLACEHOLDER;
  }
}
