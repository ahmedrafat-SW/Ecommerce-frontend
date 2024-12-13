import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';
import {productUrls} from '../config/apiUrls';
import {Product} from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchSubject = new BehaviorSubject<any>(null)

  constructor(private httpClient: HttpClient) { }

  getId(product: any){
    const href = product._links.product.href;
    const productId = href.match(/(\d+)(?!.*\d)/); // Matches the last number in the string
    return parseInt(productId[0], 10);
  }

  getProductsList(page?: number, pageSize?: number): Observable<any> {
    return this.httpClient.get<any>(productUrls.list + `?page=${page}&size=${pageSize}`)
      // .pipe(map( response => response._embedded.products));
  }


  getProduct(productId: number): Observable<any> {
    return this.httpClient.get(productUrls.get + productId);
  }

  search(searchWord: string): Observable<any>{
    return this.httpClient.get(productUrls.search + `?searchWord=${searchWord}`);
  }

  setSearchWord(searchWord: string){
    this.searchSubject.next(searchWord);
  }

  getSearchWord(){
    return this.searchSubject.asObservable();
  }
}

interface GetResponse{
  _embedded: {
    products: Product[]
  }
}
