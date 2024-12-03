import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../common/ProductCategory';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent implements OnInit{

  @Output() sidebarToggleEmitter = new EventEmitter<boolean>();
  isHidden = false;
  categories: ProductCategory[] = []
  cartCount = 0;

  constructor(
      private categoryService: ProductCategoryService,
      private productService: ProductService,
              ) {
  }

  sidebarToggle() {
    this.isHidden = !this.isHidden;
    this.sidebarToggleEmitter.emit(this.isHidden);
  }

  ngOnInit() {
    this.categoryService.getProductCategories()
      .subscribe(
        data => {
          this.categories = data;
        }
      );

    // @ts-ignore
    this.productService.getAddToCart()
        .subscribe(
            (data) => {
              if (data) {
                this.cartCount += data;
              }
            }
        )
  }
}
