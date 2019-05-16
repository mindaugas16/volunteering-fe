import { Injectable } from '@angular/core';
import { LanguageInterface } from '../language.interface';

const LanguageConstants = {
  SESSION_STORAGE_KEY: 'language'
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() {
  }

  storeLanguage(lang: LanguageInterface) {
    sessionStorage.setItem(LanguageConstants.SESSION_STORAGE_KEY, JSON.stringify(lang));
  }

  getStoredLanguage(): LanguageInterface {
    return JSON.parse(sessionStorage.getItem(LanguageConstants.SESSION_STORAGE_KEY));
  }
}
