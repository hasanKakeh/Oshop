import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { async } from '@firebase/util';
import { map, take } from 'rxjs/operators';
import { Product } from './model/app-product.model';
import { ShoppingCardItem } from './model/app-shopping-card-item.model';
import { ShoppingCard } from './model/app-shopping-card.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCardService {
  constructor(private db: AngularFireDatabase) {}
  private create() {
    return this.db
      .list('/shopping-cards')
      .push({ dateCreated: new Date().getTime() });
  }
  async getCard() {
    const cardId = await this.getOrCreateCard();
    return this.db
      .object<ShoppingCard>('/shopping-cards/' + cardId)
      .valueChanges()
      .pipe(map((result) => new ShoppingCard(result.items)));
  }
  private getItem(cardId: string, productId: string) {
    return this.db.object<ShoppingCardItem>(
      '/shopping-cards/' + cardId + '/items/' + productId
    );
  }

  private async getOrCreateCard() {
    let cardId = localStorage.getItem('cardId');
    if (cardId) return cardId;

    let result = await this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
  }
  addToCard(product: Product) {
    this.updateItemQuantity(product, +1);
  }
  removeFromCard(product: Product) {
    this.updateItemQuantity(product, -1);
  }
  async clearShoppingCard() {
    let cardId = await this.getOrCreateCard();
    this.db.list('/shopping-cards/' + cardId + '/items/').remove();
  }
  async updateItemQuantity(product: Product, changeNum: number) {
    let cardId = await this.getOrCreateCard();
    let item$ = this.getItem(cardId, product.uid);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        let quantity = (item?.quantity || 0) + changeNum;
        if (quantity === 0) item$.remove();
        else item$.update({ product, quantity });
      });
  }
  getTotalCount(items: ShoppingCardItem[]) {
    let sum = 0;
    for (let productId in items) {
      sum += items[productId].quantity;
    }
    return sum;
  }
  getTotalItemPrice(item: ShoppingCardItem) {
    return item.quantity * item.product.price;
  }
  getTotalPrice(items: ShoppingCardItem[]) {
    let sum = 0;
    for (let productId in items) {
      sum += this.getTotalItemPrice(items[productId]);
    }
    return sum;
  }
  convertCardObjectToArray(card: ShoppingCard) {
    let data = new Array<ShoppingCardItem>();
    for (let item in card.items) {
      data.push(
        new ShoppingCardItem(
          card.items[item].product,
          card.items[item].quantity
        )
      );
    }
    return data;
  }
}
