import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularCommonModule } from './../../modules/angular-common.module';
import { TranslatePipe } from '../../pipes/intl/translate.pipe';

@Component({
  standalone: true,
  imports: [AngularCommonModule, TranslatePipe],
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  resetForm!: FormGroup;
  message: string | null = null;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid && this.token) {
      this.authService
        .passwordReset(this.token, this.resetForm.value.newPassword)
        .subscribe({
          next: () => {
            this.message = 'Password has been reset successfully.';
          },
          error: () => {
            this.message = 'Failed to reset password.';
          },
        });
    }
  }
}
