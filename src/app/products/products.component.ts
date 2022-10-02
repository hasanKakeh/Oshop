import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { Product } from '../model/app-product.model';
import { ShoppingCard } from '../model/app-shopping-card.model';
import { ProductService } from '../product.service';
import { ShoppingCardService } from '../shopping-card.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private CardService: ShoppingCardService
  ) {}

  filterProduct$: Product[];
  categories$: Observable<any>;
  category$: string;
  card$: ShoppingCard;
  cardSubscription: Subscription;
  async ngOnInit() {
    this.productService.getAllProduct().subscribe((products) => {
      this.route.queryParamMap.subscribe((params) => {
        this.category$ = params.get('category');
        this.filterProduct$ = this.category$
          ? products?.filter((product) => {
              return product.category === this.category$;
            })
          : products;
      });
    });
    this.categories$ = this.categoryService.fetchCategories();
    this.cardSubscription = (await this.CardService.getCard()).subscribe(
      (card) => {
        this.card$ = card;
      }
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cardSubscription?.unsubscribe();
  }
}
