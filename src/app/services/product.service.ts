import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {productUrls} from '../config/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<any> {
    return this.httpClient.get(productUrls.list);
  }
}
