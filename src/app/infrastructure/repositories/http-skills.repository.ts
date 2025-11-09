import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SkillsRepository } from './skills.repository';
import { SkillsData } from '../../models/skill.model';
import { LanguageService } from '../../core/i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class HttpSkillsRepository extends SkillsRepository {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private cachedData: SkillsData | null = null;
  private cachedLang: string | null = null;

  async getAll(): Promise<SkillsData> {
    const currentLang = this.languageService.getCurrentLanguage();

    if (this.cachedData && this.cachedLang === currentLang) {
      return this.cachedData;
    }

    const url = `/assets/data/${currentLang}/skills.json`;
    const data = await firstValueFrom(this.http.get<SkillsData>(url));

    this.cachedData = data;
    this.cachedLang = currentLang;

    return data;
  }
}
