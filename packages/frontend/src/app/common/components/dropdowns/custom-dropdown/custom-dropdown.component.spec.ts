import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDropdownComponentComponent } from './custom-dropdown.component';

describe('CustomDropdownComponentComponent', () => {
  let component: CustomDropdownComponentComponent;
  let fixture: ComponentFixture<CustomDropdownComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDropdownComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDropdownComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
