import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SyncFusionModule } from './modules/syncfusion.module';
import { AuthNavigationService } from './services/navigation/auth/auth-navigation.service';

@Component({
  standalone: true,
  imports: [RouterModule, SyncFusionModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Inject(AuthNavigationService) authNavigationService: AuthNavigationService
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  title = 'frontend';
}
