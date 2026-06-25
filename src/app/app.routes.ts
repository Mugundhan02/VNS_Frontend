import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { Login } from './login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Clients } from './features/clients/clients';
import { Suppliers } from './features/suppliers/suppliers';
import { SubContractors } from './features/subcontractors/subcontractors';
import { Materials } from './features/materials/materials';
import { Transactions } from './features/transactions/transactions';
import { Companies } from './features/companies/companies';
import { Lookups } from './features/lookups/lookups';
import { Users } from './features/users/users';
import { PageNotFound } from './core/components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Public
  { path: 'login', canActivate: [guestGuard], component: Login },

  // Protected
  { path: 'dashboard',      canActivate: [authGuard], component: Dashboard },
  { path: 'clients',        canActivate: [authGuard], component: Clients },
  { path: 'suppliers',      canActivate: [authGuard], component: Suppliers },
  { path: 'subcontractors', canActivate: [authGuard], component: SubContractors },
  { path: 'materials',      canActivate: [authGuard], component: Materials },
  { path: 'jobworks',       canActivate: [authGuard], component: Materials },
  { path: 'transactions',   canActivate: [authGuard], component: Transactions },
  { path: 'companies',      canActivate: [authGuard], component: Companies },
  { path: 'lookups',        canActivate: [authGuard], component: Lookups },
  { path: 'users',          canActivate: [authGuard], component: Users },

  
  { path: '**', component: PageNotFound },
];
