import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { SkillsRepository } from '../../infrastructure/repositories/skills.repository';
import { HttpSkillsRepository } from '../../infrastructure/repositories/http-skills.repository';
import { SkillsData, SkillCategory } from '../../models/skill.model';
import { LanguageService } from '../../core/i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class SkillsViewModel {
  private readonly skillsRepository: SkillsRepository = inject(HttpSkillsRepository);
  private readonly languageService = inject(LanguageService);

  readonly data = signal<SkillsData | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedCategory = signal<string | null>(null);

  constructor() {
    // Reload data when language changes
    effect(() => {
      this.languageService.currentLanguage(); // Track language changes
      this.load();
    }, { allowSignalWrites: true });
  }

  readonly filteredCategories = computed<SkillCategory[]>(() => {
    const data = this.data();
    if (!data) return [];

    const selected = this.selectedCategory();
    if (!selected) return data.categories;

    return data.categories.filter(cat => cat.category === selected);
  });

  readonly availableCategories = computed<string[]>(() => {
    const data = this.data();
    if (!data) return [];
    return data.categories.map(cat => cat.category);
  });

  async load(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);
      const skillsData = await this.skillsRepository.getAll();
      this.data.set(skillsData);
    } catch (err) {
      this.error.set('Failed to load skills data');
      console.error('SkillsViewModel load error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  selectCategory(category: string | null): void {
    this.selectedCategory.set(category);
  }

  clearFilter(): void {
    this.selectedCategory.set(null);
  }
}
