import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsViewModel } from '../../viewmodels/projects.vm';
import { ProjectCardComponent } from '../../shared/components/project-card.component';
import { SeoService } from '../../../core/seo/seo.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ProjectCardComponent],
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.css'],
})
export class ProjectsPage implements OnInit {
  readonly vm = inject(ProjectsViewModel);
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  searchQuery = '';

  async ngOnInit(): Promise<void> {
    await this.vm.load();
    this.updateSEO();
  }

  onSearchChange(query: string): void {
    this.vm.setSearchQuery(query);
  }

  private updateSEO(): void {
    this.seoService.setPageMetadata({
      title: 'Projects - Juan Sebastian Galindo Lizcano',
      description: 'Portfolio of software development projects, from enterprise applications to educational platforms.',
      type: 'website',
      lang: this.languageService.getCurrentLanguage(),
    });
  }
}
