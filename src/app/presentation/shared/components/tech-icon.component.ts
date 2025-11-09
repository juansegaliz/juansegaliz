import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (iconClass) {
      <i [class]="iconClass + ' colored'" [title]="name"></i>
    } @else {
      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]">
        {{ name }}
      </span>
    }
  `,
  styles: [`
    i {
      font-size: 2rem;
      display: inline-block;
    }

    i.colored {
      color: inherit;
    }
  `]
})
export class TechIconComponent {
  @Input() name: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get iconClass(): string {
    const sizeClass = this.size === 'sm' ? 'text-2xl' : this.size === 'lg' ? 'text-5xl' : 'text-4xl';
    const iconMap: { [key: string]: string } = {
      // .NET Technologies
      '.NET': 'devicon-dot-net-plain',
      '.NET Core': 'devicon-dotnetcore-plain',
      '.NET 6': 'devicon-dotnetcore-plain',
      '.NET 7': 'devicon-dotnetcore-plain',
      '.NET 8': 'devicon-dotnetcore-plain',
      '.NET Framework': 'devicon-dot-net-plain',
      'ASP.NET': 'devicon-dot-net-plain',
      'ASP.NET Core': 'devicon-dotnetcore-plain',
      'ASP.NET MVC': 'devicon-dot-net-plain',
      'C#': 'devicon-csharp-plain',

      // JavaScript/TypeScript
      'Angular': 'devicon-angular-plain',
      'Angular 8': 'devicon-angular-plain',
      'Angular 9': 'devicon-angular-plain',
      'Angular 12': 'devicon-angular-plain',
      'Angular 14': 'devicon-angular-plain',
      'Angular 16': 'devicon-angular-plain',
      'Angular 17': 'devicon-angular-plain',
      'Angular 18': 'devicon-angular-plain',
      'TypeScript': 'devicon-typescript-plain',
      'JavaScript': 'devicon-javascript-plain',
      'jQuery': 'devicon-jquery-plain',
      'RxJS': 'devicon-rxjs-plain',

      // Mobile
      'Ionic': 'devicon-ionic-original',
      'Android': 'devicon-android-plain',

      // Databases
      'SQL Server': 'devicon-microsoftsqlserver-plain',
      'PostgreSQL': 'devicon-postgresql-plain',
      'MySQL': 'devicon-mysql-plain',
      'MongoDB': 'devicon-mongodb-plain',
      'SQLite': 'devicon-sqlite-plain',

      // Cloud & DevOps
      'Azure': 'devicon-azure-plain',
      'Docker': 'devicon-docker-plain',
      'Kubernetes': 'devicon-kubernetes-plain',
      'Azure DevOps': 'devicon-azuredevops-plain',

      // Message Queues
      'RabbitMQ': 'devicon-rabbitmq-plain',

      // Version Control
      'Git': 'devicon-git-plain',

      // Web Technologies
      'HTML5': 'devicon-html5-plain',
      'CSS3': 'devicon-css3-plain',
      'SASS': 'devicon-sass-original',
      'Bootstrap': 'devicon-bootstrap-plain',
      'Tailwind': 'devicon-tailwindcss-plain',

      // Backend
      'PHP': 'devicon-php-plain',
      'Java': 'devicon-java-plain',
      'Spring Boot': 'devicon-spring-plain',
      'Python': 'devicon-python-plain',

      // Web Servers
      'Apache': 'devicon-apache-plain',

      // Others
      'Elasticsearch': 'devicon-elasticsearch-plain',
      'Redis': 'devicon-redis-plain',
      'Selenium': 'devicon-selenium-original',
      'Firebase': 'devicon-firebase-plain',
      'GraphQL': 'devicon-graphql-plain',
    };

    const devicon = iconMap[this.name];
    return devicon ? `${devicon} ${sizeClass}` : '';
  }
}
