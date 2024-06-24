import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private storageKey = 'cartItems';

  constructor() {
    this.loadCartItems();
  }

  private saveCartItems(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  private loadCartItems(): void {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  addToCart(product: any): void {
    this.cartItems.push(product);
    this.saveCartItems();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  removeFromCart(index: number): void {
    if (index > -1 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
  }
}
