import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/home/home.page').then((m) => m.HomePage),
    title: 'Home',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./presentation/pages/about/about.page').then((m) => m.AboutPage),
    title: 'About',
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./presentation/pages/skills/skills.page').then((m) => m.SkillsPage),
    title: 'Skills',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./presentation/pages/projects/projects.page').then((m) => m.ProjectsPage),
    title: 'Projects',
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./presentation/pages/project-detail/project-detail.page').then(
        (m) => m.ProjectDetailPage
      ),
    title: 'Project Detail',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./presentation/pages/contact/contact.page').then((m) => m.ContactPage),
    title: 'Contact',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
