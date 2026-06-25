import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Public routes
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./login/login').then(m => m.Login),
  },

  // Protected routes
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'clients',
    canActivate: [authGuard],
    loadComponent: () => import('./features/clients/clients').then(m => m.Clients),
  },
  {
    path: 'suppliers',
    canActivate: [authGuard],
    loadComponent: () => import('./features/suppliers/suppliers').then(m => m.Suppliers),
  },
  {
    path: 'subcontractors',
    canActivate: [authGuard],
    loadComponent: () => import('./features/subcontractors/subcontractors').then(m => m.SubContractors),
  },
  {
    path: 'materials',
    canActivate: [authGuard],
    loadComponent: () => import('./features/materials/materials').then(m => m.Materials),
  },
  {
    path: 'jobworks',
    canActivate: [authGuard],
    loadComponent: () => import('./features/materials/materials').then(m => m.Materials),
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadComponent: () => import('./features/transactions/transactions').then(m => m.Transactions),
  },
  {
    path: 'companies',
    canActivate: [authGuard],
    loadComponent: () => import('./features/companies/companies').then(m => m.Companies),
  },
  {
    path: 'lookups',
    canActivate: [authGuard],
    loadComponent: () => import('./features/lookups/lookups').then(m => m.Lookups),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./features/users/users').then(m => m.Users),
  },

  // Fallback
  { path: '**', redirectTo: 'dashboard' },
];
