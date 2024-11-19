import { NgModule } from '@angular/core';
import { EmailComponent } from '../email/email.component';
import { PasswordComponent } from '../password/password.component';

@NgModule({
  declarations: [],
  imports: [EmailComponent, PasswordComponent],
  exports: [EmailComponent, PasswordComponent],
})
export class AppInputModule {}
