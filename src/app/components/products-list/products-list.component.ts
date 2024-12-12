import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{

  productsList: Product[] = [];
  page: number = 1;
  pageSize = 10;
  totalItems = 10;
  cartCount = 0;


  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listProducts(this.page, this.pageSize);
  }

  listProducts(page?: number, pageSize?: number) {
    this.productService.getProductsList(page, pageSize)
      .subscribe(
        response => {
          this.productsList = response._embedded.products;
          // this.totalItems = response.page.totalPages;
          console.log('total items', this.totalItems)
      }
      );
  }

  addToCart(product: Product) {
    this.cartCount +=1;
    this.productService.setAddToCart(this.cartCount);
  }

  changePage(page: number) {
    this.page = page;
    this.listProducts(this.page, this.pageSize)
  }
}
