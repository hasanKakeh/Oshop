import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgFilterComponent } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'dropDownFilter',
  template: `<select
    id="category"
    class="form-select"
    [formControl]="selectform"
    (ngModelChange)="updateFilter()"
  >
    <option ngValue="">All Categories</option>
    <<ng-container *ngIf="options | async"> </ng-container>

    <option *ngFor="let item of options | async" [ngValue]="item.key">
      {{ item.data.name }}
    </option>
  </select>`,
})
export class DropDownFilter implements AgFilterComponent {
  options: Observable<any>;
  params: IFilterParams;
  field: string;
  selectform: FormControl;

  constructor() {
    this.selectform = new FormControl('');
  }

  agInit(params: IFilterParams): void {
    this.field = params.colDef.field;
    this.options = params.context;
    this.params = params;
  }

  isFilterActive(): boolean {
    return this.selectform.value !== '';
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return params.data[this.field] === this.selectform.value;
  }

  getModel() {
    return { value: this.selectform.value };
  }

  setModel(model: any) {
    this.selectform.setValue(model.value || '');
  }

  updateFilter() {
    this.params.filterChangedCallback();
  }
}
