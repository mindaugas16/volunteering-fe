import { Component, OnInit } from '@angular/core';
import { DropdownItemInterface } from '../../dropdown/dropdown.interface';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { LanguageInterface } from '../language.interface';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {
  selected: LanguageInterface;
  isOpen: boolean;
  languages: LanguageInterface[] = [
    {title: 'Lithuanian', lang: 'lt'},
    {title: 'English', lang: 'en'}
  ];
  items: DropdownItemInterface[] = [
    {
      title: 'Lithuanian',
      action: () => {
        this.onLanguageSelect({title: 'Lithuanian', lang: 'lt'});
      }
    },
    {
      title: 'English',
      action: () => {
        this.onLanguageSelect({title: 'English', lang: 'en'});
      }
    },
  ];

  constructor(private translateService: TranslateService,
              private languageService: LanguageService) {
  }

  ngOnInit() {
    this.onLanguageSelect(this.languageService.getStoredLanguage());
  }

  onLanguageSelect(language: LanguageInterface) {
    if (!language) {
      language = this.languages.find(({lang}) => lang === this.translateService.defaultLang);

      if (!language) {
        throw new Error('Unable select language');
      }
    }
    this.translateService.use(language.lang);
    this.selected = language;
    this.isOpen = false;
    this.languageService.storeLanguage(this.selected);
  }

}
