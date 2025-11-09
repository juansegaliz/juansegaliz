import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageToggleComponent } from './language-toggle.component';
import { ThemeToggleComponent } from './theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LanguageToggleComponent,
    ThemeToggleComponent,
  ],
  template: `
    <header class="sticky top-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border-color)] backdrop-blur-sm bg-opacity-90">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a
            routerLink="/"
            class="text-xl font-bold text-[var(--text-primary)] hover:text-primary-600 transition-colors"
          >
            Juan Sebastian
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <a
              routerLink="/"
              routerLinkActive="text-primary-600"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-[var(--text-primary)] hover:text-primary-600 transition-colors font-medium"
            >
              {{ 'nav.home' | translate }}
            </a>
            <a
              routerLink="/about"
              routerLinkActive="text-primary-600"
              class="text-[var(--text-primary)] hover:text-primary-600 transition-colors font-medium"
            >
              {{ 'nav.about' | translate }}
            </a>
            <a
              routerLink="/skills"
              routerLinkActive="text-primary-600"
              class="text-[var(--text-primary)] hover:text-primary-600 transition-colors font-medium"
            >
              {{ 'nav.skills' | translate }}
            </a>
            <a
              routerLink="/projects"
              routerLinkActive="text-primary-600"
              class="text-[var(--text-primary)] hover:text-primary-600 transition-colors font-medium"
            >
              {{ 'nav.projects' | translate }}
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="text-primary-600"
              class="text-[var(--text-primary)] hover:text-primary-600 transition-colors font-medium"
            >
              {{ 'nav.contact' | translate }}
            </a>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-3">
            <app-language-toggle />
            <app-theme-toggle />
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
