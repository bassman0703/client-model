import {Routes} from '@angular/router';
import {AccountsComponent} from "./pages/accounts/containers/accounts/accounts.component";


export const appRoutes: Routes = [

  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./pages/accounts/containers/accounts/accounts.component').then(m => m.AccountsComponent)
      }
    ]
  }
];
