import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{

  productId: any;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private checkoutService: CheckoutService
  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.productId = param.get('id');
      this.getProductBy(this.productId)
    });

    console.log(this.productId);
  }

  updateMainImage(imageUrl: string) {
    this.product.imageUrl = imageUrl;
  }

  newReview = {
    reviewerName: '',
    rating: null,
    comment: ''
  };
  loading = false;

  submitReview() {
    // Add the current date to the new review
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const reviewToAdd = {
      ...this.newReview,
      date: formattedDate
    };

    // Add the new review to the reviews list
    // @ts-ignore
    this.product.reviews.push(reviewToAdd);

    // Reset the form
    this.newReview = {
      reviewerName: '',
      rating: null,
      comment: ''
    };

    alert('Thank you for your review!');
  }

  getProductBy(productId: number) {
    this.loading = true;
    this.productService.getProduct(productId)
      .subscribe(response => {
        this.product = response;
        this.product.reviews = [];
      })
    this.loading = false;
  }

  addToCart(product: Product) {
    this.checkoutService.addNewItemToCart(product);
  }
}
