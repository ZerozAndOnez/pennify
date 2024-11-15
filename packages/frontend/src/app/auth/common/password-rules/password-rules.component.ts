import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { translate } from '../../../utils/intl/translate';
import type { PasswordValidationRules } from '../../../utils/validators/form-validators';

@Component({
  standalone: true,
  selector: 'app-password-rules',
  template: `
    <ul class="mt-2 list-unstyled">
      <li *ngFor="let rule of rules" class="d-flex align-items-center">
        <span
          [class.text-success]="rule.isValid"
          [class.text-danger]="!rule.isValid"
          class="me-2"
        >
          <i
            [ngClass]="
              rule.isValid
                ? 'bi bi-check-circle-fill text-success'
                : 'bi bi-x-circle-fill text-danger'
            "
          ></i>
          {{ rule.message }}
        </span>
      </li>
    </ul>
  `,
  styles: [],
  imports: [CommonModule],
})
export class PasswordRulesComponent {
  @Input() validation!: PasswordValidationRules;

  get rules() {
    return [
      {
        isValid: this.validation.hasLetter || false,
        message: translate('Includes a letter'),
      },

      {
        isValid: this.validation.hasNumber || false,
        message: translate('Includes a number'),
      },
      {
        isValid: this.validation.hasSpecialCharacter || false,
        message: translate('Includes a special character'),
      },

      {
        isValid: this.validation.isLongEnough || false,
        message: translate('At least 8 characters long'),
      },
    ];
  }
}
