import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  Product,
  ProductCategories,
  ProductResponce,
  Products,
} from '../models/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_ENDPOINT = 'https://dummyjson.com';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponce> {
    return this.http.get<ProductResponce>(`${this.API_ENDPOINT}/products`);
  }

  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`${this.API_ENDPOINT}/products/${id}`);
  }

  categories(): Observable<ProductCategories[]> {
    return this.http.get<ProductCategories[]>(
      `${this.API_ENDPOINT}/products/categories`
    );
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(
        `${this.API_ENDPOINT}/products/category/${category}`
      )
      .pipe(map((res) => res.products));
  }
  searchProducts(query: string): Observable<Product[]> {
    console.log(
      query,
      this.http
        .get<ProductResponce>(`${this.API_ENDPOINT}/products/search?q=${query}`)
        .pipe(map((res) => res.products))
    );

    return this.http
      .get<ProductResponce>(`${this.API_ENDPOINT}/products/search?q=${query}`)
      .pipe(map((res) => res.products));
  }
  deleteProductById(id: number) {
    this.http
      .delete<ProductResponce>(`${this.API_ENDPOINT}/products/${id}`)
      .pipe(map((res) => console.log(res)));
    console.log(id);

    return 4;
  }
  updateProduct(id: number, updatedData: Partial<Product>) {
    const payload = { ...updatedData, id: undefined };
    return this.http.put<Product>(
      `${this.API_ENDPOINT}/products/${id}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(
      `${this.API_ENDPOINT}/products/add`,
      product,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getFilteredProducts(limit: number, sortOrder: 'asc' | 'desc'): Observable<Product[]> {
    const url = `${this.API_ENDPOINT}/products?limit=${limit}&sortBy=title&order=${sortOrder}`;
    return this.http
      .get<ProductResponce>(url)
      .pipe(map((res) => res.products));
  }
//   getFilteredAndSearchedProducts(options: {
//     search?: string;
//     limit?: number;
//     sortOrder?: 'asc' | 'desc';
//   }): Observable<Product[]> {
//     let url = `${this.API_ENDPOINT}/products`;
//     const queryParams: string[] = [];
//     if (options.search) {
//       url += `/search`;
//       queryParams.push(`q=${options.search}`);
//     }
//     if (options.limit !== undefined) {
//       queryParams.push(`limit=${options.limit}`);
//     }
//     if (options.sortOrder) {
//       queryParams.push(`sortBy=title&order=${options.sortOrder}`);
//     }
//     const finalUrl = `${url}?${queryParams.join('&')}`;
//     return this.http
//       .get<ProductResponce>(finalUrl)
//       .pipe(map((res) => res.products));
//   }
    

  // async categories(): Promise<ProductCategories[]> {
  //     const data = await fetch(`${this.API_ENDPOINT}/products/categories'`);
  //     return await data.json() ?? [];
  // }

  // async getProductById(id: number): Promise<Products | undefined> {
  //     const data = await fetch(`${this.API_ENDPOINT}/${id}`);
  //     return await data.json() ?? {};
  // }
}
