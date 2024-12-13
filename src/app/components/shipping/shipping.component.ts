import { Component } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent {

  checkoutDetails = {
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor() {
  }

  submitForm(): void {
    console.log('Checkout Details:', this.checkoutDetails);
    // Add logic to send data to the backend or process the payment
    alert('Order placed successfully!');
  }
}
