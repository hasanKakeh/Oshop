import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<any>;
  @Input() category$:string;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void { this.categories$ = this.categoryService.fetchCategories();
  }

}
