import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';
import { ColDef, IDatasource } from 'ag-grid-community';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/model/app-product.model';
import { ProductService } from 'src/app/product.service';
import { BtnCellRender } from './btn-cellRender.component';
import { DropDownFilter } from './dropDown-custem-filter.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  category: Observable<any>;
  displayedColumns = ['title', 'category', 'price', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productSubscription: Subscription;
  frameworkComponents: any;
  filterTxt: FormControl;
  dataSource: IDatasource;
  columnDefs: ColDef[];
  rowData: [];
  gridApi: any;
  collectionSize = 0;
  pageSize = 5;
  page = 1;
  destroy = new Subject<void>();
  
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.filterTxt = new FormControl('');
  }
  onPageChange(){
    this.gridApi.onFilterChanged();   
  }

  ngOnInit(): void {
    this.category = this.categoryService.fetchCategories();
    this.frameworkComponents = {
      dropDownFilter: DropDownFilter,
    };
    this.filterTxt.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        filterTextValue = value;
        this.gridApi.onFilterChanged();
      });
    this.columnDefs = [
      { field: 'title', flex: 1 },
      { field: 'price', flex: 1 },
      {
        field: 'category',
        flex: 1,
        filter: 'dropDownFilter',
        filterParams: {
          context: this.category,
        },
      },
      { field: 'edit', cellRendererFramework: BtnCellRender, flex: 1 },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.dataSource = {
      rowCount: null,
      getRows: ({ startRow, endRow, successCallback, filterModel }) => {
        console.log(filterModel);
        this.productService
          .getAllProduct()
          .pipe(takeUntil(this.destroy))
          .subscribe((products) => {this.collectionSize=products.length
            filterModel = filterTextValue
              ? { title: { value: filterTextValue }, ...filterModel }
              : filterModel;
            var dataAfterPaginaion = products.slice(
              (this.page - 1) * this.pageSize,
              this.page * this.pageSize
            );
           // console.log((this.page - 1) * this.pageSize - 1);
            
            var dataAfterFiltering = this.filterData(
              dataAfterPaginaion,
              filterModel
            );
            var data = dataAfterFiltering.slice(startRow, endRow);
            console.log(data);
            
            var lastRow = -1;
            if (dataAfterFiltering.length <= endRow) {
              lastRow = dataAfterFiltering.length;
            }
            successCallback(data, lastRow);
          });
      },
    };
    params.api.setDatasource(this.dataSource);
  }

  filterData(data: Product[], filterModel: any) {
    var filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
      return data;
    }
    var resultOfFilter = [];
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (filterModel.category && filterModel.category?.value !== '') {
        if (filterModel.category?.value !== item.category) continue;
      }
      if (filterModel.title) {
        if (!item.title.includes(filterModel.title?.value)) continue;
      }

      resultOfFilter.push(item);
    }

    return resultOfFilter;
  }
  openProductForm() {
    this.router.navigate(['admin/products/new']);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy.next();
    this.destroy.complete();
    //this.productSubscription.unsubscribe();
  }
}
var filterTextValue: string;
