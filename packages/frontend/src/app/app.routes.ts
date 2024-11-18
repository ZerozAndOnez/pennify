import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guard/auth-guard/auth.guard';
import { AuthRedirectGuard } from './auth/guard/auth-redirect/auth-redirect.guard';
import { PasswordResetRequestComponent } from './auth/password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

export const getRedirectRoute = (route: string) => `/${route}`;

export const APP_ROUTE_PATHS = {
  login: 'auth/login',
  signup: 'auth/signup',
  passwordResetRequest: 'auth/password-reset-request',
  passwordReset: 'auth/password-reset',
  root: '',
};

export const APP_AUTHENTIATION_PATHS = [
  getRedirectRoute(APP_ROUTE_PATHS.login),
  getRedirectRoute(APP_ROUTE_PATHS.signup),
  getRedirectRoute(APP_ROUTE_PATHS.passwordResetRequest),
  getRedirectRoute(APP_ROUTE_PATHS.passwordReset),
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
    path: APP_ROUTE_PATHS.passwordResetRequest,
    component: PasswordResetRequestComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: APP_ROUTE_PATHS.passwordReset,
    component: PasswordResetComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: APP_ROUTE_PATHS.root,
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
