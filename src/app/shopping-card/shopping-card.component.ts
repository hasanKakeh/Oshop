import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Product } from '../model/app-product.model';
import { ShoppingCardItem } from '../model/app-shopping-card-item.model';
import { ShoppingCard } from '../model/app-shopping-card.model';
import { ShoppingCardService } from '../shopping-card.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss'],
})
export class ShoppingCardComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ShoppingCardItem>();
  displayedColumns = ['image', 'title', 'quantity', 'price'];
  card$: ShoppingCard;
  sumOfQuantity: number;
  totalPrice: number;
  cardSubscription: Subscription;
  constructor(private cardService: ShoppingCardService,private router: Router) {}

  async ngOnInit() {

   // this.card$=await this.cardService.getCard()
    this.cardSubscription = (await this.cardService.getCard()).subscribe(
      (card) => {
       
        this.totalPrice = this.cardService.getTotalPrice(card.items);
        this.dataSource.data = this.cardService.convertCardObjectToArray(card);
        this.card$ = card;
      }
    );
  }
  clearCard() {
    this.cardService.clearShoppingCard();
  }
  checkOut(){
this.router.navigate(["/check-out"])
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cardSubscription.unsubscribe();
  }
}
