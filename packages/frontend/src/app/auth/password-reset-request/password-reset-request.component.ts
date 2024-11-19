import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularCommonModule } from './../../modules/angular-common.module';
import { translate } from '../../utils/intl/translate';
import { TranslatePipe } from '../../pipes/intl/translate.pipe';

@Component({
  standalone: true,
  imports: [AngularCommonModule, TranslatePipe],
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss'],
})
export class PasswordResetRequestComponent implements OnInit {
  resetRequestForm!: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.resetRequestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.resetRequestForm.valid) {
      this.authService
        .passwordResetRequest(this.resetRequestForm.value.email)
        .subscribe({
          next: () => {
            this.message = translate(
              'Password reset link has been sent to your email.'
            );
          },
          error: () => {
            this.message = translate('Failed to send password reset link.');
          },
        });
    }
  }
}
