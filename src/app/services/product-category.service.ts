import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {productCategoryUrls} from '../config/apiUrls';
import {ProductCategory} from '../common/ProductCategory';
import {map, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  currentCategorySubject = new Subject();

  constructor(private http: HttpClient) { }


  getId(category: any){
    const href = category._links.self.href;
    const categoryId = href.match(/(\d+)(?!.*\d)/);
    return  parseInt(categoryId[0], 10)
  }

  getCategories(): Observable<ProductCategory[]>{
    return this.http.get<GetResponse>(productCategoryUrls.list)
      .pipe(map(response => response._embedded.productCategory));
  }

  getCategoryProducts(categoryId : number): Observable<any>{
    return this.http.get(productCategoryUrls.get + `${categoryId}/products`);
  }


  setCurrentCategory(category: any){
    this.currentCategorySubject.next(category);
  }

  getCurrentCategory(): Observable<any> {
    return this.currentCategorySubject.asObservable();
  }


}

interface  GetResponse {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
