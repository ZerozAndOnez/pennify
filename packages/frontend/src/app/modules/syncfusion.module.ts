import { NgModule } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  PageService,
  FilterService,
  SortService,
  GroupService,
  ToolbarService,
  ResizeService,
  AggregateService,
  EditService,
  ExcelExportService,
  PdfExportService,
  GridModule,
} from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
  imports: [TextBoxModule, GridModule, ButtonModule],
  exports: [TextBoxModule, GridModule, ButtonModule],
  providers: [
    PageService,
    FilterService,
    SortService,
    GroupService,
    ToolbarService,
    ResizeService,
    AggregateService,
    EditService,
    ExcelExportService,
    PdfExportService,
  ],
})
export class SyncFusionModule {}
