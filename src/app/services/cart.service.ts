import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDetails } from '../components/product-details/ProductDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  removeFromCart(item: ProductDetails) {
    throw new Error('Method not implemented.');
  }

  private cart: ProductDetails[] = [];
  private cartSubject = new BehaviorSubject<ProductDetails[]>(this.cart);

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: ProductDetails) {
    this.cart.push(product);
    this.cartSubject.next(this.cart);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }
}




