import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/model/app-product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  id: string;
  product: Product;
  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.product = { title: '', category: '', price: 0, imageURL: '' };
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .getProductById(this.id)
        .pipe(take(1))
        .subscribe((product) => {
          this.product = product;
          this.form.setValue(product);
        });
    }
    this.form = new FormGroup({
      title: new FormControl(this.product.title,[Validators.required,Validators.minLength(2)]),
      price: new FormControl(this.product.price,[Validators.required]),
      category: new FormControl(this.product.category,[Validators.required]),
      imageURL: new FormControl(this.product.imageURL,[Validators.required]),
    });
    this.categories$ = this.categoryService.fetchCategories();
  }
  async submit(from: FormGroup) {
    console.log(from);
    if (this.id) {
      this.productService.updateProduct(this.id, from.value as Product).then(() => {
        this.router.navigate(['admin/products']);
      });
    } else {
      this.productService.createProduct(from.value as Product).then(() => {
        this.router.navigate(['admin/products']);
      });
    }
  }
  onDelete() {
    if (confirm('Are you sure you want delete this product?')) {
      this.productService.deleteProduct(this.id).then(() => {
        this.router.navigate(['admin/products']);
      });
    }
  }
}
