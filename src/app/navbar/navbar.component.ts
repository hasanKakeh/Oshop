import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { ShoppingCard } from '../model/app-shopping-card.model';
import { AppUser } from '../model/app-user.model';
import { ShoppingCardService } from '../shopping-card.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;

  sumOfQuantity: number;
  constructor(
    private authService: AuthService,
    private cardService: ShoppingCardService
  ) {
    this.authService.appUser$.subscribe((user) => (this.appUser = user));
    this.sumOfQuantity = 0;
  }
  card$:Observable<ShoppingCard>
  totalItemCount:Observable<number>
  async ngOnInit() {
   this.card$=  (await this.cardService.getCard())
    
  }
  logout() {
    this.authService.logout();
  }
}
