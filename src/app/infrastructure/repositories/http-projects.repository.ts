import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectsRepository } from './projects.repository';
import { Project, ProjectListItem } from '../../models/project.model';
import { ProjectFilter } from '../../models/project-filter.model';
import { LanguageService } from '../../core/i18n/language.service';
import { ProjectMapper } from '../mappers/project.mapper';

@Injectable({
  providedIn: 'root',
})
export class HttpProjectsRepository extends ProjectsRepository {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private cachedProjects: Project[] | null = null;
  private cachedLang: string | null = null;

  async list(filter?: ProjectFilter): Promise<ProjectListItem[]> {
    const projects = await this.loadProjects();

    let filtered = [...projects];

    if (filter) {
      if (filter.year) {
        filtered = filtered.filter(p => p.year === filter.year);
      }
      if (filter.country) {
        filtered = filtered.filter(p => p.country === filter.country);
      }
      if (filter.type) {
        filtered = filtered.filter(p => p.type === filter.type);
      }
      if (filter.client) {
        filtered = filtered.filter(p => p.client === filter.client);
      }
      if (filter.query) {
        const query = filter.query.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.stack.some(tech => tech.toLowerCase().includes(query))
        );
      }
    }

    return filtered.map(ProjectMapper.toListItem);
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const projects = await this.loadProjects();
    return projects.find(p => p.slug === slug) || null;
  }

  async getAvailableFilters(): Promise<{
    years: number[];
    countries: string[];
    types: string[];
    clients: string[];
  }> {
    const projects = await this.loadProjects();

    const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
    const countries = [...new Set(projects.map(p => p.country))].sort();
    const types = [...new Set(projects.map(p => p.type))].sort();
    const clients = [...new Set(projects.map(p => p.client))].sort();

    return { years, countries, types, clients };
  }

  private async loadProjects(): Promise<Project[]> {
    const currentLang = this.languageService.getCurrentLanguage();

    if (this.cachedProjects && this.cachedLang === currentLang) {
      return this.cachedProjects;
    }

    const url = `/assets/data/${currentLang}/projects.json`;
    const data = await firstValueFrom(this.http.get<Project[]>(url));

    this.cachedProjects = data;
    this.cachedLang = currentLang;

    return data;
  }
}
