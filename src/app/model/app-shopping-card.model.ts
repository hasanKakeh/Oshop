import { ProductService } from '../product.service';
import { Product } from './app-product.model';
import { ShoppingCardItem } from './app-shopping-card-item.model';

export class ShoppingCard {
items:ShoppingCardItem[] | any
     data :Array<ShoppingCardItem>
  constructor( items: ShoppingCardItem[]|{}) {
     
        this.items=items?items:{}

    //   this.data=new Array<ShoppingCardItem> ()
    // for (let item in this.items) {
    //   const product = items[item].product;
    //   const quantity = items[item].quantity;
    //   this.data.push({ product, quantity });
    // }
  }

  dateCreated: Date;

  get totalItemCount() {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].quantity;
    }
    return sum;
  }
}
