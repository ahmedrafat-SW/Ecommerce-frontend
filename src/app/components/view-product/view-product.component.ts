import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';

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
    private productService: ProductService
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
    this.productService.getProduct(productId)
      .subscribe(response => {
        this.product = response;
      })
  }
}
