import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.type';
import { ProductService } from '../../../services/product.services';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'product-actions',
  standalone: true,
  imports: [NzButtonModule, RouterModule, EditProductComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  @Input('product') product!: Product;
  constructor(private cartService: CartService, private productService: ProductService) {}
  addToCart(product: Product): void {
    this.cartService.addToCart(this.product);
  }
  deleteProduct(id:number) {
    this.productService.deleteProductById(id)
    console.log(id,  this.productService.deleteProductById(id));
    
    // this.isLoggedIn$.subscribe((isLoggedIn) => {
    //   if (isLoggedIn) {
    //     this.productService.onDeleteProduct(this.product.id);
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }
}
