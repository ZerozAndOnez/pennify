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
import { EmailComponent } from '../../common/components/input/email/email.component';
import { PasswordComponent } from '../../common/components/input/password/password.component';

@Component({
  standalone: true,
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  providers: [AuthStore],
  imports: [
    AngularCommonModule,
    RouterModule,
    PennifyAppModule,
    AuthBackgroundComponent,
    AuthCardComponent,
    AuthIllustrationComponent,
    EmailComponent,
    PasswordComponent,
  ],
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild(EmailComponent) emailComponent!: EmailComponent;
  signupForm!: FormGroup;
  focusedField: string | null = null;

  constructor(private fb: FormBuilder, public authStore: AuthStore) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  ngAfterViewInit(): void {
    this.emailComponent.emailInput.nativeElement.focus();
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.authStore.signup(this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  onFocus(fieldName: string) {
    this.focusedField = fieldName;
  }

  onBlur(fieldName: string) {
    if (this.focusedField === fieldName) {
      this.focusedField = null;
    }
  }
}
