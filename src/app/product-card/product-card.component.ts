import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/app-product.model';
import { ShoppingCardService } from '../shopping-card.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() showAction: boolean;
  @Input() shoppingCard: any;
  isAddOrdar: boolean;
  constructor(private cardService: ShoppingCardService) {}

  ngOnInit(): void {}
  addToCard() {
    this.cardService.addToCard(this.product);
  }
  getQuantity() {
    if (!this.shoppingCard || this.shoppingCard==null) return 0;
    let item;
    item = this.shoppingCard.items[this.product.uid];
  //  console.log('card', this.shoppingCard.items);
    return item ? item.quantity : 0;
  }
  removeFromCard() {
    this.cardService.removeFromCard(this.product);
  }
}
