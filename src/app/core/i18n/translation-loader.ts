import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslationHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, public prefix: string = '/assets/i18n/', public suffix: string = '.json') {}

  getTranslation(lang: string): Observable<object> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}

export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslationHttpLoader(http);
}
