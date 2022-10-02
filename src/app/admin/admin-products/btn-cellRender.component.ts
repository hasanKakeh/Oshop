import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'BtnCellRender',
  template: `<a [routerLink]="cellValue">Edit</a>`,
  styles: [
    `
      a {
        text-decoration: none;
      }
    `,
  ],
})
export class BtnCellRender implements ICellRendererAngularComp {
  cellValue: string;

  agInit(params: ICellRendererParams) {
    this.cellValue = params.value;
  }
  refresh(params: ICellRendererParams) {
    // set value into cell again
    return false;
  }
 
}
