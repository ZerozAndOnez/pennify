import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light auth-background"
      [ngStyle]="{
        background:
          'linear-gradient(' +
          direction +
          ',  var(--auth-background-start-color), var(--auth-background-end-color))'
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class AuthBackgroundComponent {
  @Input() direction: string = 'to left';
}
