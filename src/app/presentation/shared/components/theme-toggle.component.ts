import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="toggle()"
      class="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-colors"
      [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <svg
        class="w-5 h-5 text-[var(--text-primary)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        @if (isDark()) {
          <!-- Sun icon -->
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        } @else {
          <!-- Moon icon -->
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        }
      </svg>
    </button>
  `,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly isDark = this.themeService.isDark;

  toggle(): void {
    this.themeService.toggle();
  }
}
