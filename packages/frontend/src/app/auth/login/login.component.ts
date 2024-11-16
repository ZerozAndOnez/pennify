import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import {
  emailValidator,
  passwordValidator,
} from '../../utils/validators/form-validators';
import { AngularCommonModule } from '../../modules/angular-common.module';
import { PennifyAppModule } from '../../modules/pennify-app.module';
import { AuthBackgroundComponent } from '../common/auth-background/auth-background.component';
import { AuthCardComponent } from '../common/auth-card/auth-card.component';
import { AuthIllustrationComponent } from '../common/auth-illustration/auth-illustration.component';
import { AppInputModule } from '../../common/components/input/app-input/app-input.module';
import { EmailComponent } from '../../common/components/input/email/email.component';
import { APP_ROUTE_PATHS, getRedirectRoute } from '../../app.routes';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  providers: [AuthStore],
  imports: [
    AngularCommonModule,
    RouterModule,
    PennifyAppModule,
    AuthBackgroundComponent,
    AuthCardComponent,
    AuthIllustrationComponent,
    AppInputModule,
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild(EmailComponent) emailComponent!: EmailComponent;
  loginForm!: FormGroup;
  APP_ROUTE_PATHS = APP_ROUTE_PATHS;
  getRedirectRoute = getRedirectRoute;

  constructor(private fb: FormBuilder, public authStore: AuthStore) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  ngAfterViewInit(): void {
    this.emailComponent.emailInput.nativeElement.focus();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authStore.login(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  clearError(): void {
    this.authStore.clearError();
  }
}
