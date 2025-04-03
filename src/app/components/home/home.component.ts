import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../product-details/ProductDetails.model';
import { burgerProducts } from '../product-details/ProductDetails.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  BProducts: ProductDetails[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void { 
    this.BProducts = burgerProducts;
  }
  goToProductDetails(productId: number) {
    console.log('Navigating to:', `/product-details/${productId}`);
    this.router.navigate(['/productsDetails', productId]); // Navigate to product details page
  }
}
