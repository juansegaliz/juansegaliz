import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'theme-preference';

  readonly theme = signal<Theme>('light');
  readonly isDark = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();

      effect(() => {
        const currentTheme = this.theme();
        this.applyTheme(currentTheme);
        this.isDark.set(currentTheme === 'dark');
      });
    }
  }

  private initializeTheme(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;

    if (stored) {
      this.theme.set(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }
  }

  private applyTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;

      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  toggle(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
