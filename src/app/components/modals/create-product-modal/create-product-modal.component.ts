import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subscription, } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.services';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import { Product } from '../../../models/product.type';
@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    NzButtonModule, 
    NzModalModule,
     NzInputModule, 
     NzDatePickerModule, 
     NzFormModule, 
     NzTimePickerModule,
    CommonModule],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.css'
})
export class CreateProductModalComponent implements OnDestroy {
  constructor(private productService: ProductService, private router: Router, private authService: AuthService){}

  userSubscription?: Subscription;
  permission = false;
  isLoading = false;

  showModal(): void {
    this.userSubscription = this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.permission = true;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  handleOk(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.permission = false;
      this.isLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.permission = false;
  }

  productForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    thumbnail: new FormControl('', { validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.productForm.invalid) return;
    const newProduct: Partial<Product> = {
      title: this.productForm.value.title || '',
      description: this.productForm.value.description || '',
      thumbnail: this.productForm.value.thumbnail || '',
    };
    this.isLoading = true;
    this.productService.createProduct(newProduct).subscribe({
      next: (createdProduct) => {
        console.log('Created Product:', createdProduct);
        this.productForm.reset();
        this.isLoading = false;
        this.permission = false;
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.isLoading = false;
      }
    });
  }
  

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}