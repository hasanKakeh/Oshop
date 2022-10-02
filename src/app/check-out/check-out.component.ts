import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ShoppingCardItem } from '../model/app-shopping-card-item.model';
import { ShoppingCard } from '../model/app-shopping-card.model';
import { AppUser } from '../model/app-user.model';
import { OrderService } from '../order.service';
import { ShoppingCardService } from '../shopping-card.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  card$: ShoppingCard;
  cardItems: ShoppingCardItem[];
  shipping: any;
  userId: string;
  cardSub: Subscription;
  userSub: Subscription;
  form: FormGroup;
  constructor(
    public cardService: ShoppingCardService,
    private authService: AuthService,
    private orderService: OrderService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      name:[ '',Validators.required],
      addressLine1: [ '',Validators.required ],
      addressLine2:  ['',Validators.required] ,
      city:[""]
    });
    // this.form = new FormGroup({
    //   name: new FormControl('',Validators.required),
    //   addressLine1: new FormControl('',Validators.required),
    //   addressLine2: new FormControl('',Validators.required),
    //   city: new FormControl('',Validators.required),
    // });
    this.cardSub = (await this.cardService.getCard()).subscribe((card) => {
      this.card$ = card;
      this.cardItems = this.cardService.convertCardObjectToArray(this.card$);
    });
    this.userSub = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  async placeOrder(formValue: any) {
    let order = {
      userId: this.userId,
      datePlace: new Date().getTime(),
      shipping: formValue,
      items: this.cardItems.map((i) => i.product),
      quantity: this.card$.totalItemCount,
      totalPrice: this.cardService.getTotalPrice(this.card$.items),
    };
    let result = await this.orderService.orderStore(order);
    this.route.navigate(['/order-success', result.key]);
    console.log(formValue);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
    this.cardSub.unsubscribe();
  }
}
