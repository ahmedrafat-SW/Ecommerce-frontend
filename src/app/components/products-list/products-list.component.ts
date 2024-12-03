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
  cartCount = 0;


  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductsList()
      .subscribe(
        products => {
          this.productsList = products;
      }
      );
  }

  addToCart(product: Product) {
    this.cartCount +=1;
    this.productService.setAddToCart(this.cartCount);
  }
}
