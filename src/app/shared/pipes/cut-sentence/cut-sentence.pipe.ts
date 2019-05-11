import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutSentence'
})
export class CutSentencePipe implements PipeTransform {

  transform(value: string, maxlength: number): string {
    if (!value) {
      return;
    }

    const valueSize = value.length;
    value = value.slice(0, maxlength);
    if (value.length < valueSize) {
      value += '...';
    }
    return value;
  }
}
