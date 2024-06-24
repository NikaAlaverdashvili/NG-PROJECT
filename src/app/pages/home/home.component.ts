import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/Product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  products: Product[] = [];
  clothes: Product[] = [];
  electronics: Product[] = [];
  furniture: Product[] = [];
  shoes: Product[] = [];
  other: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.slice(0, 10);
    });

    this.productService.filterProductsByCategory(1).subscribe((data: Product[]) => {
      this.clothes = data.slice(0, 8);
    });

    this.productService.filterProductsByCategory(2).subscribe((data: Product[]) => {
      this.electronics = data.slice(0, 8);
    });

    this.productService.filterProductsByCategory(3).subscribe((data: Product[]) => {
      this.furniture = data.slice(0, 8);
    });

    this.productService.filterProductsByCategory(4).subscribe((data: Product[]) => {
      this.shoes = data.slice(0, 8);
    });

    this.productService.filterProductsByCategory(5).subscribe((data: Product[]) => {
      this.other = data.slice(0, 8);
    });
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  viewProductDetail(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
