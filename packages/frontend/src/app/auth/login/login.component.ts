import { Component } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { SyncFusionModule } from '../../modules/syncfusion.module';
import { AngularCommonModule } from '../../modules/angular-common.module';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  providers: [AuthStore],
  imports: [SyncFusionModule, AngularCommonModule],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(public authStore: AuthStore) {}

  onLogin() {
    this.authStore.login({ email: this.email, password: this.password });
  }
}
