import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../core/seo/seo.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.css'],
})
export class ContactPage implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  ngOnInit(): void {
    this.updateSEO();
  }

  private updateSEO(): void {
    this.seoService.setPageMetadata({
      title: 'Contact - Juan Sebastian Galindo Lizcano - nuevo titulo',
      description: 'Connect with me via email or LinkedIn for collaboration, consulting, or teaching opportunities.',
      type: 'website',
      lang: this.languageService.getCurrentLanguage(),
      url: 'https://juansegaliz.com/contact',
    });
  }
}
