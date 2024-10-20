import { Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
// Define the application's routes
export const routes: Routes = [
  {
    // Redirects empty path to 'accounts'
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full',
  },
  {
    // Route to display the list of accounts
    path: 'accounts',
    component: AccountListComponent,
  },
  {
    // Route to display the details of a specific account
    path: 'account-detail/:id',
    component: AccountDetailComponent,
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
