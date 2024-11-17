import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() options: { label: any; value: any }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() optionSelected = new EventEmitter<any>();

  isOpen = false;

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectOption(option: any, event: MouseEvent): void {
    event.stopPropagation();
    this.optionSelected.emit(option);
    this.isOpen = false;
  }
}
