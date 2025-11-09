import { Injectable, inject, signal, effect } from '@angular/core';
import { ProjectsRepository } from '../../infrastructure/repositories/projects.repository';
import { HttpProjectsRepository } from '../../infrastructure/repositories/http-projects.repository';
import { Project } from '../../models/project.model';
import { LanguageService } from '../../core/i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailViewModel {
  private readonly projectsRepository: ProjectsRepository = inject(HttpProjectsRepository);
  private readonly languageService = inject(LanguageService);

  readonly project = signal<Project | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly notFound = signal(false);
  private readonly currentSlug = signal<string | null>(null);

  constructor() {
    // Reload data when language changes
    effect(() => {
      this.languageService.currentLanguage(); // Track language changes
      const slug = this.currentSlug();
      if (slug) {
        this.loadBySlug(slug);
      }
    }, { allowSignalWrites: true });
  }

  async loadBySlug(slug: string): Promise<void> {
    this.currentSlug.set(slug);
    try {
      this.loading.set(true);
      this.error.set(null);
      this.notFound.set(false);

      const project = await this.projectsRepository.getBySlug(slug);

      if (!project) {
        this.notFound.set(true);
      } else {
        this.project.set(project);
      }
    } catch (err) {
      this.error.set('Failed to load project details');
      console.error('ProjectDetailViewModel loadBySlug error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  reset(): void {
    this.project.set(null);
    this.error.set(null);
    this.notFound.set(false);
    this.currentSlug.set(null);
  }
}
