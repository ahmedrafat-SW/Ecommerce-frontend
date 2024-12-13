import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartItem} from '../common/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  addToCartEvent  = new BehaviorSubject<any>(null);
  cartItems: CartItem[] = [];

  constructor() { }

  addNewItemToCart(item : any){
    if (item) {
      if (!this.cartItems.find(i => i.product.id === item.id)){
        this.cartItems.push({product: item, quantity: 1})
      } else {
        const idx = this.cartItems.findIndex(i => i.product.id === item.id);
         this.cartItems[idx].quantity = this.cartItems[idx].quantity + 1;
      }
      this.setCartItemsSize()
    }
  }

  getCartItems(){
    return this.cartItems;
  }

  setCartItemsSize(){
     this.addToCartEvent.next(this.cartItems.length)
  }

  getCartItemsSize(): Observable<any>{
    return this.addToCartEvent.asObservable();
  }


}
