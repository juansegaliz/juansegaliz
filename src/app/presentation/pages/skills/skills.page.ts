import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsViewModel } from '../../viewmodels/skills.vm';
import { SeoService } from '../../../core/seo/seo.service';
import { LanguageService } from '../../../core/i18n/language.service';
import { TechIconComponent } from '../../shared/components/tech-icon.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, TechIconComponent],
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.css'],
})
export class SkillsPage implements OnInit {
  readonly vm = inject(SkillsViewModel);
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  async ngOnInit(): Promise<void> {
    await this.vm.load();
    this.updateSEO();
  }

  private updateSEO(): void {
    this.seoService.setPageMetadata({
      title: 'Skills - Juan Sebastian Galindo Lizcano',
      description: 'Technical skills and expertise in .NET, Angular, Cloud, DevOps, and modern software architecture.',
      type: 'website',
      lang: this.languageService.getCurrentLanguage(),
    });
  }
}
