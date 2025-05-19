import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../../models/product.type';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.services';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    NzModalModule, 
    NzInputModule,
    NzButtonModule, 
    ReactiveFormsModule, 
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit, OnChanges {
  @Input({ required: true }) product!: Product;
constructor(private authService: AuthService, private router: Router, private productService: ProductService ){}

  isLoggedIn$ = this.authService.isLoggedIn();

  isVisible = false;
  isConfirmLoading = false;

  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    thumbnail: new FormControl('', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.setFormValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.setFormValues();
    }
  }

  private setFormValues(): void {
    this.form.patchValue({
      title: this.product.title,
      description: this.product.description,
      thumbnail: this.product.thumbnail,
    });
  }

  showModal(): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isVisible = true;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onSubmit() {
    const updatedProduct: Partial<Product> = {
      title: this.form.value.title || '',
      description: this.form.value.description || '',
      thumbnail: this.form.value.thumbnail || '',
    };

    this.productService.updateProduct(this.product.id, updatedProduct);
    this.form.reset();
  }
}
