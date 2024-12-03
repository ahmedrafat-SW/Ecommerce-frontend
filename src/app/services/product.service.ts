import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subject} from 'rxjs';
import {productUrls} from '../config/apiUrls';
import {Product} from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  addToCartEvent  = new Subject();


  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(productUrls.list)
      .pipe(map( response => response._embedded.products));
  }

  setAddToCart(data : number){
    this.addToCartEvent.next(data)
  }

  getAddToCart() {
    return this.addToCartEvent.asObservable();
  }
}

interface GetResponse{
  _embedded: {
    products: Product[]
  }
}
