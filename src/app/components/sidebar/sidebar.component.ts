import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../common/ProductCategory';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  showSidebar = true;
  categories: ProductCategory[] = [];
  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  openCategories: { [key: string]: boolean } = {};

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit() {
    this.productCategoryService.getProductCategories()
      .subscribe(
        data => {
          this.categories = data;
        }
      )
  }

  // Toggles the visibility of subcategories
  toggleCategory(categoryName: string): void {
    this.openCategories[categoryName] = !this.openCategories[categoryName];
  }

  closeSidebar() {
    this.showSidebar = !this.showSidebar;
    this.closeSidebarEvent.emit(this.showSidebar)
  }

}
