import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { translate } from '../../../../utils/intl/translate';
import type { PasswordValidationRules } from '../../../../utils/validators/form-validators';
import { PasswordRulesComponent } from '../../../../auth/common/password-rules/password-rules.component';
import { AngularCommonModule } from '../../../../modules/angular-common.module';
import { TranslatePipe } from '../../../../pipes/intl/translate.pipe';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [AngularCommonModule, TranslatePipe, PasswordRulesComponent],
  template: `
    <div class="mb-3">
      <label for="password" class="form-label">
        {{ label | translate }}
      </label>
      <input
        type="password"
        id="password"
        class="form-control"
        [formControl]="control"
        autocomplete="current-password"
        placeholder="{{ placeholder | translate }}"
        [class.is-invalid]="control.invalid && control.touched"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />
      <div *ngIf="control.invalid && (focused || control.touched)">
        <app-password-rules
          [validation]="passwordValidation"
        ></app-password-rules>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements ControlValueAccessor {
  @Input() label: string = translate('Password');
  @Input() placeholder: string = translate('Enter your password');
  @Input() control: any;
  @Input() validation!: PasswordValidationRules;

  focused: boolean = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
  }

  onFocus(): void {
    this.focused = true;
    this.onTouched();
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
  }

  get passwordValidation() {
    const errors = this.control?.errors || {};
    return errors['passwordRules'] || {};
  }
}
