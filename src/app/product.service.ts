import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Product } from './model/app-product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}
  createProduct(product: Product) {
    return this.db.list('/product').push(product);
  }
  getAllProduct(){
   return this.db.list<Product>('/product') .snapshotChanges()
   .pipe(
     map((items) => {
       return items.map((a) => {
         const data = a.payload.val() as Product;
         const uid = a.payload.key;
         return { uid, ...data };
       });
     })
   );
  }
  getProductById(uid:string){
    return this.db.object<Product>('/product/'+uid).valueChanges()
  }
  updateProduct(uid:string,product:Product){
    return this.db.object<Product>('/product/'+uid).update(product)
  }
  deleteProduct(uid:string){
    return this.db.object<Product>('/product/'+uid).remove()
  }
}
