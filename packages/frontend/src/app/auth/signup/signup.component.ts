import { Component } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { SyncFusionModule } from '../../modules/syncfusion.module';
import { AngularCommonModule } from '../../modules/angular-common.module';

@Component({
  standalone: true,
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  providers: [AuthStore],
  imports: [SyncFusionModule, AngularCommonModule],
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(public authStore: AuthStore) {}

  onSignup() {
    this.authStore.signup({ email: this.email, password: this.password });
  }
}
