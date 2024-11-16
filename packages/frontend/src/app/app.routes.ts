import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guard/auth-guard/auth.guard';
import { AuthRedirectGuard } from './auth/guard/auth-redirect/auth-redirect.guard';

export const getRedirectRoute = (route: string) => `/${route}`;

export const APP_ROUTE_PATHS = {
  login: 'auth/login',
  signup: 'auth/signup',
  root: '',
};

export const APP_AUTHENTIATION_PATHS = [
  getRedirectRoute(APP_ROUTE_PATHS.login),
  getRedirectRoute(APP_ROUTE_PATHS.signup),
];

export const appRoutes: Routes = [
  {
    path: APP_ROUTE_PATHS.login,
    component: LoginComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: APP_ROUTE_PATHS.signup,
    component: SignupComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: APP_ROUTE_PATHS.root,
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
