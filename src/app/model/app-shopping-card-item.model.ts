import { Product } from './app-product.model';

export class ShoppingCardItem {

  constructor(public  product: Product,public quantity: number){}
  get totalPrice() {
    return this.quantity * this.product.price;
  }
  
}
