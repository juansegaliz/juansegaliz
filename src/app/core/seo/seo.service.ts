import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export interface SEOConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  author?: string;
  keywords?: string[];
  lang?: string;
}

export interface JsonLdPerson {
  '@context': string;
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
  description?: string;
  image?: string;
  address?: {
    '@type': 'PostalAddress';
    addressCountry?: string;
  };
}

export interface JsonLdWebSite {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  inLanguage?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly platformId = inject(PLATFORM_ID);

  setPageMetadata(config: SEOConfig): void {
    // Title
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'title', content: config.title });

    // Description
    this.meta.updateTag({ name: 'description', content: config.description });

    // Keywords
    if (config.keywords && config.keywords.length > 0) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
    }

    // Author
    if (config.author) {
      this.meta.updateTag({ name: 'author', content: config.author });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    // Language
    if (config.lang && isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = config.lang;
    }
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
  }

  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  setJsonLd(data: JsonLdPerson | JsonLdWebSite | object): void {
    if (isPlatformBrowser(this.platformId)) {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }

  setCanonicalUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');

      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }

      link.setAttribute('href', url);
    }
  }

  setHreflangLinks(urls: { lang: string; url: string }[]): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remove existing hreflang links
      const existingLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingLinks.forEach(link => link.remove());

      // Add new hreflang links
      urls.forEach(({ lang, url }) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        link.setAttribute('href', url);
        document.head.appendChild(link);
      });
    }
  }

  removeJsonLd(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        script.remove();
      }
    }
  }
}
