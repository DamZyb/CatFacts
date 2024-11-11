import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CatFactsComponent} from './components/cat-list/cat-facts.component';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'facts', component: CatFactsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];
