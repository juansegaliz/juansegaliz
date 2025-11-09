import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 p-1 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
      @for (lang of languages; track lang) {
        <button
          type="button"
          [class.active]="currentLang() === lang"
          (click)="changeLang(lang)"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          [class.bg-primary-600]="currentLang() === lang"
          [class.text-white]="currentLang() === lang"
          [class.text-[var(--text-secondary)]]="currentLang() !== lang"
          [class.hover:bg-[var(--bg-primary)]]="currentLang() !== lang"
          [attr.aria-label]="'Switch to ' + (lang === 'es' ? 'Spanish' : 'English')"
          [attr.aria-pressed]="currentLang() === lang"
        >
          {{ lang.toUpperCase() }}
        </button>
      }
    </div>
  `,
})
export class LanguageToggleComponent {
  private readonly languageService = inject(LanguageService);

  readonly languages: Language[] = ['es', 'en'];
  readonly currentLang = this.languageService.currentLanguage;

  changeLang(lang: Language): void {
    this.languageService.changeLanguage(lang);
  }
}
