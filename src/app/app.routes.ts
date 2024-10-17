import { Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full',
  },
  {
    path: 'accounts',
    component: AccountListComponent,
  },
  {
    path: 'account-detail/:id',
    component: AccountDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'accounts',
  },
];
