import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../common/ProductCategory';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy{
  showSidebar = true;
  categories: ProductCategory[] = [];
  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  openCategories: { [key: string]: boolean } = {};

  constructor(private categoryService: ProductCategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe( data => {
          data.forEach(category => {
            category.id = this.categoryService.getId(category)
            this.categories.push(category);
          })
        }
      )
  }

  getCategoryItems(category: any): void {
    this.categoryService.setCurrentCategory(this.categoryService.getId(category));
  }

  closeSidebar() {
    this.showSidebar = !this.showSidebar;
    this.closeSidebarEvent.emit(this.showSidebar)
  }

  ngOnDestroy() {

  }
}
