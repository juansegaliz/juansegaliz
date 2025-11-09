import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { ProjectsRepository } from '../../infrastructure/repositories/projects.repository';
import { HttpProjectsRepository } from '../../infrastructure/repositories/http-projects.repository';
import { ProjectListItem } from '../../models/project.model';
import { ProjectFilter, FilterOption } from '../../models/project-filter.model';
import { LanguageService } from '../../core/i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsViewModel {
  private readonly projectsRepository: ProjectsRepository = inject(HttpProjectsRepository);
  private readonly languageService = inject(LanguageService);

  readonly projects = signal<ProjectListItem[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    // Reload data when language changes
    effect(() => {
      this.languageService.currentLanguage(); // Track language changes
      this.load();
    }, { allowSignalWrites: true });
  }

  readonly currentFilter = signal<ProjectFilter>({});
  readonly searchQuery = signal('');

  readonly yearOptions = signal<FilterOption[]>([]);
  readonly countryOptions = signal<FilterOption[]>([]);
  readonly typeOptions = signal<FilterOption[]>([]);
  readonly clientOptions = signal<FilterOption[]>([]);

  readonly hasActiveFilters = computed(() => {
    const filter = this.currentFilter();
    return !!(filter.year || filter.country || filter.type || filter.client || this.searchQuery());
  });

  readonly displayedProjects = computed(() => {
    return this.projects();
  });

  async load(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Load filter options
      const filterOptions = await this.projectsRepository.getAvailableFilters();

      this.yearOptions.set(
        filterOptions.years.map(year => ({ label: year.toString(), value: year }))
      );
      this.countryOptions.set(
        filterOptions.countries.map(country => ({ label: country, value: country }))
      );
      this.typeOptions.set(filterOptions.types.map(type => ({ label: type, value: type })));
      this.clientOptions.set(
        filterOptions.clients.map(client => ({ label: client, value: client }))
      );

      // Load projects
      await this.applyFilters();
    } catch (err) {
      this.error.set('Failed to load projects');
      console.error('ProjectsViewModel load error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async applyFilters(): Promise<void> {
    try {
      this.loading.set(true);
      const filter: ProjectFilter = {
        ...this.currentFilter(),
        query: this.searchQuery() || undefined,
      };

      const projects = await this.projectsRepository.list(filter);
      this.projects.set(projects);
    } catch (err) {
      this.error.set('Failed to filter projects');
      console.error('ProjectsViewModel applyFilters error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  setYearFilter(year: number | null): void {
    this.currentFilter.update(filter => ({ ...filter, year: year || undefined }));
    this.applyFilters();
  }

  setCountryFilter(country: string | null): void {
    this.currentFilter.update(filter => ({ ...filter, country: country || undefined }));
    this.applyFilters();
  }

  setTypeFilter(type: string | null): void {
    this.currentFilter.update(filter => ({ ...filter, type: type || undefined }));
    this.applyFilters();
  }

  setClientFilter(client: string | null): void {
    this.currentFilter.update(filter => ({ ...filter, client: client || undefined }));
    this.applyFilters();
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  clearFilters(): void {
    this.currentFilter.set({});
    this.searchQuery.set('');
    this.applyFilters();
  }
}
