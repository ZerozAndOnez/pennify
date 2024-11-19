import { AbstractControl, ValidationErrors } from '@angular/forms';
import { translate } from '../intl/translate';

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.value;
  if (!email) {
    return null;
  }

  // Simple email regex, to check if email is actually valid we should
  // send a confirmation email to the email address
  const emailRegex = /^\S+@\S+$/;
  return emailRegex.test(email)
    ? null
    : { email: translate('Invalid email format') };
}

export interface PasswordValidationRules {
  isLongEnough: boolean;
  hasLetter: boolean;
  hasSpecialCharacter: boolean;
  hasNumber: boolean;
}

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.value || '';
  const rules: PasswordValidationRules = {
    isLongEnough: password.length >= 8,
    hasLetter: /[\p{L}]/u.test(password),
    hasSpecialCharacter: /[^A-Za-z0-9]/.test(password),
    hasNumber: /\d/.test(password),
  };

  // Check if all rules are satisfied
  const isValid = Object.values(rules).every((rule) => rule);

  return isValid ? null : { passwordRules: rules };
}
