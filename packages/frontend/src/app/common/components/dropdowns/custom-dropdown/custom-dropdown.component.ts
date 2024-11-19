import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ElementRef,
  HostListener,
} from '@angular/core';
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
  @Input() options: { label: string; value: any }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() header: TemplateRef<any> | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() optionSelected = new EventEmitter<any>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
