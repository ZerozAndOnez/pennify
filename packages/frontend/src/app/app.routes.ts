import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const appRoutes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
