import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { burgerProducts } from '../product-details/ProductDetails.data';
import { ProductDetails } from './ProductDetails.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  BProductId!: number;
  BProduct: ProductDetails | undefined; // Initialize as undefined
  cart: ProductDetails[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.BProductId = Number(id);
        console.log('Product ID:', this.BProductId);
        this.loadProductDetails(this.BProductId);
      }
    });
  }

  loadProductDetails(productId: number) {
    this.BProduct = burgerProducts.find(product => product.id === productId);
    if (this.BProduct && !this.BProduct.thumbnails) {
      this.BProduct.thumbnails = []; // Default to empty array
    }
  }


  addToCart() {
    if (this.BProduct) {
      this.cartService.addToCart(this.BProduct);
      this.router.navigate(['/cart']); // Redirect to cart page
    }  
  }
}

