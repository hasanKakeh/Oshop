import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../model/app-product.model';
import { ShoppingCardService } from '../shopping-card.service';

@Component({
  selector: 'quantity-box',
  templateUrl: './quantity-box.component.html',
  styleUrls: ['./quantity-box.component.scss']
})
export class QuantityBoxComponent implements OnInit {
@Input() product:Product
@Input() shoppingCard:any
  constructor(private cardService:ShoppingCardService) { }

  ngOnInit(): void {
  }
  addToCard() {
   
    this.cardService.addToCard(this.product);
  }
  getQuantity(){
    if (!this.shoppingCard || this.shoppingCard==null) return 0;
    let item;
    console.log(this.product.title,Object.keys(this.shoppingCard.items).includes(this.product.uid));
    
    Object.keys(this.shoppingCard.items).includes(this.product.uid)?
    item =this.shoppingCard.items[this.product.uid]:item
   // console.log(item);
    return item?item.quantity:0
  }
  removeFromCard(){
    this.cardService.removeFromCard(this.product);
  }
}
