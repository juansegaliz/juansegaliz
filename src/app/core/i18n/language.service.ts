import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly STORAGE_KEY = 'language-preference';

  readonly currentLanguage = signal<Language>('es');
  readonly availableLanguages: Language[] = ['es', 'en'];

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const defaultLang: Language = 'es';
    this.translate.setDefaultLang(defaultLang);

    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Language | null;

      if (stored && this.availableLanguages.includes(stored)) {
        this.changeLanguage(stored);
      } else {
        const browserLang = this.translate.getBrowserLang();
        const detected = browserLang === 'es' || browserLang === 'en' ? browserLang : defaultLang;
        this.changeLanguage(detected);
      }
    } else {
      this.translate.use(defaultLang);
      this.currentLanguage.set(defaultLang);
    }
  }

  changeLanguage(lang: Language): void {
    if (!this.availableLanguages.includes(lang)) {
      console.warn(`Language ${lang} not supported, falling back to es`);
      lang = 'es';
    }

    this.translate.use(lang);
    this.currentLanguage.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage() === 'es' ? 'en' : 'es';
    this.changeLanguage(newLang);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }
}
