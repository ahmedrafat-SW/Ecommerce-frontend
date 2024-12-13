import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {ProductCategoryService} from '../../services/product-category.service';
import {CheckoutService} from '../../services/checkout.service';

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
  loading = false;


  constructor(
    private productService: ProductService,
    private categoryService: ProductCategoryService,
    private checkoutService: CheckoutService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCurrentCategory()
      .subscribe(category => {
        if (category){
          this.loading = true
          this.categoryService.getCategoryProducts(category)
            .subscribe(response => {
              if (response){
                this.productsList = [];
                // @ts-ignore
                response._embedded.products.forEach(product =>  {
                  product.id = this.productService.getId(product)
                  this.productsList.push(product)
                });

                this.loading = false;
              }
            })
        }
      });

    this.listProducts(this.page, this.pageSize);
  }

  listProducts(page?: number, pageSize?: number) {
    this.loading = true
    this.productsList = [];
    this.productService.getProductsList(page, pageSize)
      .subscribe(
        response => {
          this.totalItems = response.page.totalPages;
          // @ts-ignore
          response._embedded.products.forEach(product =>  {
            product.id = this.productService.getId(product)
            this.productsList.push(product)
          })

          this.loading = false;
        }
      );
  }

  addToCart(product: Product) {
    this.checkoutService.addNewItemToCart(product);
  }

  changePage(page: number) {
    this.page = page;
    this.listProducts(this.page, this.pageSize)
  }

  handlePageEvent(e: PageEvent) {
    this.totalItems = e.length;
    this.pageSize = e.pageSize;
    this.page = e.pageIndex;
    this.listProducts(this.page, this.pageSize)
  }

}
