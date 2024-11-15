import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light auth-background"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .auth-background {
        @import 'src/styles/_variables.scss';
        background: $background-gradient;
      }
    `,
  ],
})
export class AuthBackgroundComponent {}
