import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '../pipes/intl/translate.pipe';
import { clearUser } from '../user/store/user.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private store: Store) {}

  onLogout(): void {
    this.store.dispatch(clearUser());
  }
}
