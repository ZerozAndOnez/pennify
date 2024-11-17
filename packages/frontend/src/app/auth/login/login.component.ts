import { Observable, of } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
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
import { selectAccounts } from '../../user/store/accounts/account.selectors';
import { hash } from '../../utils/hashing/hashing.utils';
import { Account } from '../../user/store/accounts/account.reducer';
import { CustomDropdownComponent } from '../../common/components/dropdowns/custom-dropdown/custom-dropdown.component';

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
    CustomDropdownComponent,
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild(EmailComponent) emailComponent!: EmailComponent;
  loginForm!: FormGroup;
  APP_ROUTE_PATHS = APP_ROUTE_PATHS;
  getRedirectRoute = getRedirectRoute;

  accounts$: Observable<Account[]> = of([]);
  showRecentlyUsedAccounts = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public authStore: AuthStore
  ) {
    this.accounts$ = this.store.select(selectAccounts);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, passwordValidator]],
      rememberMe: [false],
    });

    this.accounts$.subscribe((accounts) => {
      this.showRecentlyUsedAccounts = accounts.length > 0;
    });
  }

  focusOnEmailInput(): void {
    this.emailComponent?.emailInput?.nativeElement?.focus();
  }

  ngAfterViewInit(): void {
    this.focusOnEmailInput();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authStore.login(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  useAccount(email: string): void {
    this.authStore.refresh({ email });
  }

  remove(email: string): void {
    this.authStore.remove({ email });
  }

  clearError(): void {
    this.authStore.clearError();
  }

  toggleView(): void {
    this.showRecentlyUsedAccounts = !this.showRecentlyUsedAccounts;
    this.focusOnEmailInput();
  }

  getGravatarUrl(email: string): string {
    // TODO TODOLuxury move out to config
    return `https://www.gravatar.com/avatar/${hash(email)}?d=identicon`;
  }
}
