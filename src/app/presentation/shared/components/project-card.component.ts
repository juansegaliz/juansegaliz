import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectListItem } from '../../../models/project.model';
import { TechIconComponent } from './tech-icon.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TechIconComponent],
  template: `
    <article class="card group cursor-pointer h-full flex flex-col" [routerLink]="['/projects', project.slug]">
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-xl font-semibold text-[var(--text-primary)] group-hover:text-primary-600 transition-colors">
          {{ project.title }}
        </h3>
        @if (project.featured) {
          <span class="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded">
            Featured
          </span>
        }
      </div>

      <div class="flex flex-wrap gap-2 mb-3 text-sm text-[var(--text-secondary)]">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ project.year }}
        </span>
        <span class="text-[var(--border-color)]">•</span>
        <span>{{ project.country }}</span>
        <span class="text-[var(--border-color)]">•</span>
        <span>{{ project.type }}</span>
      </div>

      <p class="text-[var(--text-secondary)] mb-4 flex-grow line-clamp-3">
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-3 mt-auto items-center">
        @for (tech of project.stack.slice(0, 6); track tech) {
          <app-tech-icon [name]="tech" size="sm"></app-tech-icon>
        }
        @if (project.stack.length > 6) {
          <span class="px-2 py-1 text-xs font-medium text-[var(--text-secondary)]">
            +{{ project.stack.length - 6 }}
          </span>
        }
      </div>
    </article>
  `,
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: ProjectListItem;
}
