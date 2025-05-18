import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.services';
import { Product } from '../../../models/product.type';
import { ProductComponent } from '../product/product.component';
import { HttpClient } from '@angular/common/http';
import { TopbarComponent } from '../../topbar/topbar/topbar.component';
import { CategoryStateService } from '../../../services/category-state.service';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductComponent,
    TopbarComponent,
    CommonModule,
    PaginationComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})


export class ProductsComponent implements OnInit {
  detailId = 123;
  loading = false;
  search: string='';

  constructor(
    private productSerivice: ProductService,
    private categoryState: CategoryStateService,
    private route: ActivatedRoute,
  ) {}
  
  productService: ProductService = inject(ProductService);
  public products: Product[] = [];
  ngOnInit() {
    this.route.queryParamMap.subscribe((callback) => {
      this.search = callback.get('search') || '';
      if (this.search) {
        this.productService.searchProducts(this.search).subscribe((res) => {
          this.products = res;
          console.log('Search result:', res);
        });
      }
    });
    
    
    this.categoryState.selectedCategory$.subscribe((category) => {
      if (category === 'all') {
        this.getAllProducts();
      } else {
        this.getProductsByCategory(category);
      }
    });
  }
  
  private getAllProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.products;
    });
  }
  private getProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe((products) => {
      this.products = products;
    });
  }


  // onSearch(query: string): void {
  //   this.loading = true;
  //   this.productService.searchProducts(query).subscribe({
  //     next: (res) => {

  //   console.log('hfasjlkdfh', res);
  //       this.products = res;
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.products = [];
  //       this.loading = false;
  //     }
  //   });
  // }

}
