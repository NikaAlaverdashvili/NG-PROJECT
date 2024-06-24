import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/Product.model';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.3s 0.3s ease-in')
      ])
    ]),
    trigger('fadeInDelay', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.4s 0.4s ease-in')
      ])
    ])
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  currentPage: number = 0;
  productsPerPage: number = 20;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const title = params['title'];
      if (title) {
        this.filterByTitle(title);
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.displayPage(0);
    });
  }

  displayPage(page: number): void {
    const startIndex = page * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  nextPage(): void {
    let nextPage = this.currentPage + 1;
    if (nextPage * this.productsPerPage >= this.products.length) {
      nextPage = 0;
    }
    setTimeout(() => {
      this.displayPage(nextPage);
    }, 100);
  }

  previousPage(): void {
    let previousPage = this.currentPage - 1;
    if (previousPage < 0) {
      previousPage = Math.floor(this.products.length / this.productsPerPage);
    }
    setTimeout(() => {
      this.displayPage(previousPage);
    }, 100);
  }

  filterByTitle(title: string): void {
    this.productService.filterProductsByTitle(title).subscribe(data => {
      this.products = data;
      this.displayPage(0);
    });
  }

  filterByPrice(min: number, max: number): void {
    if (min != null && max != null) {
      this.productService.filterProductsByPrice(min, max).subscribe(data => {
        this.products = data;
        this.displayPage(0);
      });
    } else {
      this.loadProducts();
    }
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryId = +target.value;
    if (categoryId) {
      this.productService.filterProductsByCategory(categoryId).subscribe(data => {
        this.products = data;
        this.displayPage(0);
      });
    } else {
      this.loadProducts();
    }
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  viewProductDetail(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
