import { Pipe, PipeTransform } from '@angular/core';

import { translate } from '../../utils/intl/translate';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  transform(text: string): string {
    return translate(text);
  }
}
