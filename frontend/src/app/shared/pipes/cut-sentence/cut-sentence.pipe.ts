import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutSentence'
})
export class CutSentencePipe implements PipeTransform {

  transform(value: string, maxlength: number): string {
    // strip tags
    value = value.replace(/<[^>]*>/g, '');
    // remove multiple spaset
    value = value.replace(/\s+/g, ' ');

    const matches = value.match(/(.*?(?:\.|\?|!))(?: |$)/g);

    if (matches) {
      let sentences = '';
      let sentencesTemp: string = sentences;

      for (let i = 0; i < matches.length; i++) {
        sentencesTemp = `${sentencesTemp} ${matches[i]}`.trim();

        if (sentencesTemp.length >= maxlength) {
          break;
        }

        sentences = sentencesTemp;
      }
      return sentences;
    }

    return '';
  }
}
