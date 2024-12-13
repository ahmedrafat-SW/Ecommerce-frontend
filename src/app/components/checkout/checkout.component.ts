import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CheckoutService} from '../../services/checkout.service';
import {CartItem} from '../../common/CartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  cartItems: CartItem[] = [];

  constructor(
    private productService: ProductService,
    private checkoutService: CheckoutService,
  ) {}

  ngOnInit() {
    this.cartItems = this.checkoutService.getCartItems()
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.unitPrice * item.quantity, 0);
  }

  increaseQuantity(item: any): void {
    item.quantity += 1;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  }
}
