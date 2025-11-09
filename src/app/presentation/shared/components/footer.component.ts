import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <footer class="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- About -->
          <div>
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Juan Sebastian Galindo Lizcano
            </h3>
            <p class="text-[var(--text-secondary)] text-sm">
              {{ 'footer.tagline' | translate }}
            </p>
          </div>

          <!-- Social Links -->
          <div>
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">
              {{ 'footer.social' | translate }}
            </h3>
            <div class="flex flex-col gap-2">
              <a
                href="https://github.com/juansegaliz"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[var(--text-secondary)] hover:text-primary-600 transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/juansegaliz"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[var(--text-secondary)] hover:text-primary-600 transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <!-- Copyright -->
          <div class="text-[var(--text-secondary)] text-sm">
            <p>© {{ currentYear }} Juan Sebastian Galindo Lizcano</p>
            <p class="mt-2">{{ 'footer.rights' | translate }}</p>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
