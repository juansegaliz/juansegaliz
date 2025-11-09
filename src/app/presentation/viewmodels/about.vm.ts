import { Injectable, inject, signal, effect } from '@angular/core';
import { AboutRepository } from '../../infrastructure/repositories/about.repository';
import { HttpAboutRepository } from '../../infrastructure/repositories/http-about.repository';
import { AboutData } from '../../models/about.model';
import { LanguageService } from '../../core/i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class AboutViewModel {
  private readonly aboutRepository: AboutRepository = inject(HttpAboutRepository);
  private readonly languageService = inject(LanguageService);

  readonly data = signal<AboutData | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    // Reload data when language changes
    effect(() => {
      this.languageService.currentLanguage(); // Track language changes
      this.load();
    }, { allowSignalWrites: true });
  }

  async load(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);
      const aboutData = await this.aboutRepository.get();
      this.data.set(aboutData);
    } catch (err) {
      this.error.set('Failed to load about data');
      console.error('AboutViewModel load error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  getYearsAsDev(): number {
    const data = this.data();
    if (!data) return 0;
    return new Date().getFullYear() - data.sinceDev;
  }

  getYearsAsTeacher(): number {
    const data = this.data();
    if (!data) return 0;
    return new Date().getFullYear() - data.sinceTeacher;
  }
}
