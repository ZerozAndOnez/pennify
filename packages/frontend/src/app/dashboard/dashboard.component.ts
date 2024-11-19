import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { CustomDropdownComponent } from '../common/components/dropdowns/custom-dropdown/custom-dropdown.component';
import { SyncFusionModule } from '../modules/syncfusion.module';
import { TranslatePipe } from '../pipes/intl/translate.pipe';
import { Product, ProductService } from '../products/service/products.service';
import { clearUser } from '../user/store/user.actions';
import { UserState } from '../user/store/user.reducer';
import { selectUser } from '../user/store/user.selectors';
import { translate } from '../utils/intl/translate';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    SyncFusionModule,
    CustomDropdownComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  @ViewChild('grid') grid!: GridComponent;
  products: Product[] = [];
  user$: Observable<UserState | null>;
  signOutText: string;
  categoryColors: { [key: string]: string } = {};

  constructor(
    private store: Store,
    private productService: ProductService,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
    this.signOutText = translate('Sign out');
  }

  ngOnInit(): void {
    this.productService.get().subscribe((products) => {
      this.products = products;
      this.assignCategoryColors();
    });
  }

  onLogout(): void {
    this.store.dispatch(clearUser());
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  assignCategoryColors(): void {
    const colors = [
      '#FF5733',
      '#3357FF',
      '#FF33A1',
      '#FF8C33',
      '#8C33FF',
      '#FF338C',
      '#33A1FF',
      '#A133FF',
      '#FF33FF',
      '#FFA133',
      '#79e537',
      '#FF33A1',
      '#33A1FF',
      '#DD33FF',
    ];
    let colorIndex = 0;

    this.products.forEach((product) => {
      if (!this.categoryColors[product.category]) {
        this.categoryColors[product.category] = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
      }
    });
  }

  public getCategoryColor(category: string): string {
    return this.categoryColors[category] || '#000000';
  }

  public getStockTextClass(stock: number): string {
    return stock > 10 ? 'text-success' : 'text-danger fw-semibold';
  }
}
