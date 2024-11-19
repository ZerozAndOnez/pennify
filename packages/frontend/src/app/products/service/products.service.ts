import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpointUrl = 'products';

  constructor(private httpService: HttpService) {}

  get(): Observable<Product[]> {
    return this.httpService.get<Product[]>(this.endpointUrl);
  }
}
