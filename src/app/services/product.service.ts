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

  getProductsList(page?: number, pageSize?: number): Observable<any> {
    return this.httpClient.get<any>(productUrls.list + `?page=${page}&size=${pageSize}`)
      // .pipe(map( response => response._embedded.products));
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
