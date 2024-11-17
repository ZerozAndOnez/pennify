import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './../../../../pipes/intl/translate.pipe';

@Component({
  selector: 'app-session-extend-dialog',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './session-extend-dialog.component.html',
  styleUrl: './session-extend-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SessionExtendDialogComponent {
  @Input() email!: string;
  @Output() extendSession = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onExtend(): void {
    this.extendSession.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
