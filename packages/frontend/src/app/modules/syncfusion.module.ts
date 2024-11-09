import { NgModule } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
  imports: [TextBoxModule, GridModule, ButtonModule],
  exports: [TextBoxModule, GridModule, ButtonModule],
})
export class SyncFusionModule {}
