import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="card shadow-lg"
      style="
      max-width: 900px;
      width: 90%;
      border-radius: 0.5rem;
      overflow: hidden;
    "
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class AuthCardComponent {}
