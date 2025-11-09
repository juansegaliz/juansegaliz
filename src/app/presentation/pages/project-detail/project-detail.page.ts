import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectDetailViewModel } from '../../viewmodels/project-detail.vm';
import { SeoService } from '../../../core/seo/seo.service';
import { LanguageService } from '../../../core/i18n/language.service';
import { TechIconComponent } from '../../shared/components/tech-icon.component';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, TechIconComponent],
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.css'],
})
export class ProjectDetailPage implements OnInit {
  readonly vm = inject(ProjectDetailViewModel);
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      await this.vm.loadBySlug(slug);
      this.updateSEO();
    }
  }

  private updateSEO(): void {
    const project = this.vm.project();
    if (!project) return;

    this.seoService.setPageMetadata({
      title: `${project.title} - Projects`,
      description: project.description,
      type: 'article',
      lang: this.languageService.getCurrentLanguage(),
    });
  }
}
