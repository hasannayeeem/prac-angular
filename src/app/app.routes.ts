import { Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { ProductResolverService } from './components/products/product-details/product-resolver';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductsComponent } from './components/products/products/products.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', component: ProductsComponent },
          {
            path: 'products/:id', 
            resolve: {
              product: ProductResolverService
            }, 
            component: ProductDetailsComponent
          },
        ]
      },
    ],
  },

];
