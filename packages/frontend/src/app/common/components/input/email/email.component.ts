import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '../../../../pipes/intl/translate.pipe';
import { AngularCommonModule } from '../../../../modules/angular-common.module';
import { translate } from '../../../../utils/intl/translate';

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [AngularCommonModule, TranslatePipe],
  template: `
    <label for="email" class="form-label">
      {{ label | translate }}
    </label>
    <input
      type="email"
      id="email"
      class="form-control"
      [formControl]="control"
      autocomplete="email"
      placeholder="{{ placeholder | translate }}"
      [class.is-invalid]="control.invalid && control.touched"
      #emailInput
    />
    <div *ngIf="control.invalid && control.touched" class="invalid-feedback">
      {{ getFieldError() }}
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailComponent),
      multi: true,
    },
  ],
})
export class EmailComponent implements ControlValueAccessor {
  @Input() label: string = translate('Email Address');
  @Input() placeholder: string = translate('Enter your email');
  @Input() control: any;
  @ViewChild('emailInput') emailInput!: ElementRef;

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

  getFieldError(): string | null {
    if (this.control.hasError('required')) {
      return translate('Email is required');
    }
    if (this.control.hasError('email')) {
      return translate('Invalid email address');
    }
    return null;
  }
}
