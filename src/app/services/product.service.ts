import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/Product.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  filterProductsByTitle(title: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?title=${title}`);
  }

  filterProductsByPrice(min: number, max: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?price_min=${min}&price_max=${max}`);
  }

  filterProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?categoryId=${categoryId}`);
  }
}
