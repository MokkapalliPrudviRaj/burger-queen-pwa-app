import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductDetails } from '../product-details/ProductDetails.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ProductDetails[] = [];
  totalPrice: number = 0;
  id: number = 0;
  private cartSubscription!: Subscription;
  quantity: number =0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  removeItem(item: ProductDetails) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.calculateTotal();
  }

  increaseQuantity(item: ProductDetails) {
    this.quantity=item.stock++;
    this.calculateTotal();
  }

  decreaseQuantity(item: ProductDetails) {
    if (item.stock > 1) {
      item.stock--;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.stock,
      0
    );
  }

  placeOrder() {
    console.log('Order Placed:', JSON.stringify(this.cartItems, null, 2));
    alert('Order Placed Successfully!');
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
