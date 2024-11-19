import { NgModule } from '@angular/core';
import { TranslatePipe } from '../pipes/intl/translate.pipe';

@NgModule({
  imports: [TranslatePipe],
  exports: [TranslatePipe],
})
export class PennifyAppModule {}
