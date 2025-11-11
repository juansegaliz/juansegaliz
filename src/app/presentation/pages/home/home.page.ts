import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeViewModel } from '../../viewmodels/home.vm';
import { SeoService } from '../../../core/seo/seo.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  readonly vm = inject(HomeViewModel);
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  async ngOnInit(): Promise<void> {
    await this.vm.load();
    this.updateSEO();

    // Re-update SEO when language changes
    this.languageService.currentLanguage.set = ((fn) => {
      return (value: typeof this.languageService.currentLanguage extends { (): infer T } ? T : never) => {
        fn.call(this.languageService.currentLanguage, value);
        setTimeout(() => this.updateSEO(), 100);
      };
    })(this.languageService.currentLanguage.set.bind(this.languageService.currentLanguage));
  }

  getYearsAsDev(): number {
    const data = this.vm.data();
    return data ? new Date().getFullYear() - data.sinceDev : 0;
  }

  getYearsAsTeacher(): number {
    const data = this.vm.data();
    return data ? new Date().getFullYear() - data.sinceTeacher : 0;
  }

  private updateSEO(): void {
    const data = this.vm.data();
    if (!data) return;

    this.seoService.setPageMetadata({
      title: `${data.name} - ${data.title}`,
      description: data.intro.substring(0, 160),
      image: data.hero.image,
      type: 'website',
      author: data.name,
      keywords: ['.NET', 'Angular', 'Fullstack', 'Developer', 'Software Engineer', 'Teacher'],
      lang: this.languageService.getCurrentLanguage(),
      url: 'https://juansegaliz.com',
    });

    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.name,
      jobTitle: data.title,
      description: data.intro,
      address: {
        '@type': 'PostalAddress',
        addressCountry: data.location,
      },
    });
  }
}
