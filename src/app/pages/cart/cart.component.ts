import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  shippingCost: number = 10;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalQuantity = this.cartItems.length;
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  get amountToBePaid(): number {
    return this.totalPrice + this.shippingCost;
  }
}