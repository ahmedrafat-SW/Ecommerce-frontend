import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../common/ProductCategory';
import {ProductService} from "../../services/product.service";
import {CheckoutService} from '../../services/checkout.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent implements OnInit, OnDestroy{

  @Output() sidebarToggleEmitter = new EventEmitter<boolean>();
  isHidden = false;
  categories: ProductCategory[] = []
  cartCount = 0;
  cartObservable: any;
  // @ts-ignore
  searchForm: FormGroup;


  constructor(
      private categoryService: ProductCategoryService,
      private productService: ProductService,
      private checkoutService: CheckoutService,
              ) {
  }

  sidebarToggle() {
    this.isHidden = !this.isHidden;
    this.sidebarToggleEmitter.emit(this.isHidden);
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchWord: new FormControl('')
    });

    this.categoryService.getCategories()
      .subscribe(
        data => {
           data.forEach(category => {
             category.id = this.categoryService.getId(category)
             this.categories.push(category);
           })
        }
      );

    this.cartObservable = this.checkoutService.getCartItemsSize()
      .subscribe(itemsSize => {
        if (itemsSize){
          this.cartCount = itemsSize
        }
      });
  }

  getCategoryProducts(category: any) {
    this.categoryService.setCurrentCategory(this.categoryService.getId(category));
  }

  ngOnDestroy() {
    if (this.cartObservable) this.cartObservable.unsubscribe()
  }

  search() {
    const searchWord = this.searchForm.controls['searchWord'].value;
    this.productService.setSearchWord(searchWord);
    this.searchForm.controls['searchWord'].valueChanges
      .subscribe(val => {
        if (val == ''){
          this.productService.setSearchWord(val);
        }
      });
  }
}
