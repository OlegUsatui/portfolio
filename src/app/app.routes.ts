import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) },
  { path: 'portfolio', loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule) },
  { path: 'contacts', loadChildren: () => import('./features/contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'recruiter', loadChildren: () => import('./features/recruiter/recruiter.module').then(m => m.RecruiterModule) },
  { path: '**', redirectTo: '' }
];

