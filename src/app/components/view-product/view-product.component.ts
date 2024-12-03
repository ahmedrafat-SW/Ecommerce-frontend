import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{

  productId: any;

  constructor(
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.productId = param.get('id') || null;
    });

    console.log(this.productId);
  }

  product = {
    name: 'Google Chromecast 3rd Generation',
    unitPrice: 49.99,
    description: 'Stream content from your device to your TV seamlessly.',
    imageUrl: 'assets/images/default-4.avif',
    additionalImages: [
      'assets/images/image1.avif',
      'assets/images/image2.avif',
      'assets/images/image3.avif'
    ],
    features: [
      'Stream from your phone, tablet, or laptop',
      'High-speed Wi-Fi',
      'Supports Full HD resolution'
    ],
    reviews: [
      {
        reviewerName: 'John Doe',
        date: '2024-11-29',
        comment: 'Amazing product! Highly recommend.',
        rating: 5
      },
      {
        reviewerName: 'Jane Smith',
        date: '2024-11-28',
        comment: 'Works great with my TV.',
        rating: 4
      }
    ]
  };

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
}
