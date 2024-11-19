import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-illustration',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img
      src="{{ src }}"
      alt="{{ alt }}"
      class="img-fluid"
      style="max-width: 80%; border-radius: 0"
    />
  `,
  styles: ``,
})
export class AuthIllustrationComponent {
  @Input() src!: string;
  @Input() alt!: string;
}
