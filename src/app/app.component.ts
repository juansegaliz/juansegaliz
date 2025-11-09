import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './presentation/shared/components/header.component';
import { FooterComponent } from './presentation/shared/components/footer.component';
import { LanguageService } from './core/i18n/language.service';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly languageService = inject(LanguageService);
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    // Services are initialized automatically via constructor
    // Language and theme preferences are loaded from localStorage
  }
}
