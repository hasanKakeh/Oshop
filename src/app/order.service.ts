import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCardService } from './shopping-card.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db :AngularFireDatabase,private cardService:ShoppingCardService) { }
  async orderStore(order:any){
    
   let result=await this.db.list("/order").push(order);
   this.cardService.clearShoppingCard()
    return result;

  }
}
