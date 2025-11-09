import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AboutRepository } from './about.repository';
import { AboutData } from '../../models/about.model';
import { LanguageService } from '../../core/i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class HttpAboutRepository extends AboutRepository {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private cachedData: AboutData | null = null;
  private cachedLang: string | null = null;

  async get(): Promise<AboutData> {
    const currentLang = this.languageService.getCurrentLanguage();

    if (this.cachedData && this.cachedLang === currentLang) {
      return this.cachedData;
    }

    const url = `/assets/data/${currentLang}/about.json`;
    const data = await firstValueFrom(this.http.get<AboutData>(url));

    this.cachedData = data;
    this.cachedLang = currentLang;

    return data;
  }
}
