import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SyncFusionModule } from './modules/syncfusion.module';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, SyncFusionModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
