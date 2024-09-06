import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), data: { animation: 'HomePage' } },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), data: { animation: 'HomePage' } },
  { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule), data: { animation: 'AboutPage' } },
  { path: 'portfolio', loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule), data: { animation: 'PortfolioPage' } },
  { path: 'contact', loadChildren: () => import('./features/contacts/contacts.module').then(m => m.ContactsModule), data: { animation: 'ContactPage' } },
  { path: 'recruiter', loadChildren: () => import('./features/recruiter/recruiter.module').then(m => m.RecruiterModule), data: { animation: 'RecruiterPage' } },
  { path: '**', redirectTo: '' }
];
