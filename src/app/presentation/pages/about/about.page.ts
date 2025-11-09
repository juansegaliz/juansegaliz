import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AboutViewModel } from '../../viewmodels/about.vm';
import { SeoService } from '../../../core/seo/seo.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
})
export class AboutPage implements OnInit {
  readonly vm = inject(AboutViewModel);
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  async ngOnInit(): Promise<void> {
    await this.vm.load();
    this.updateSEO();
  }

  private updateSEO(): void {
    const data = this.vm.data();
    if (!data) return;

    this.seoService.setPageMetadata({
      title: `About - ${data.name}`,
      description: data.intro.substring(0, 160),
      type: 'profile',
      author: data.name,
      lang: this.languageService.getCurrentLanguage(),
    });
  }
}
