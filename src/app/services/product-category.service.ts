import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {productCategoryUrls} from '../config/apiUrls';
import {ProductCategory} from '../common/ProductCategory';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }


  getProductCategories(): Observable<ProductCategory[]>{
    return this.http.get<GetResponse>(productCategoryUrls.list)
      .pipe(map(response => response._embedded.productCategory));
  }
}

interface  GetResponse {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
