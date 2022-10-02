import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuardService } from './app/admin-auth-guard.service';
import { AdminOrdersComponent } from './app/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './app/admin/admin-products/admin-products.component';
import { ProductFormComponent } from './app/admin/product-form/product-form.component';
import { AuthGuardService } from './app/auth-guard.service';
import { CheckOutComponent } from './app/check-out/check-out.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { MyOrderComponent } from './app/my-order/my-order.component';
import { OrderSuccessComponent } from './app/order-success/order-success.component';
import { ProductsComponent } from './app/products/products.component';
import { ShoppingCardComponent } from './app/shopping-card/shopping-card.component';

const route: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-card', component: ShoppingCardComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'my-order',
    component: MyOrderComponent,
   // canActivate: [AuthGuardService],
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    // canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    // canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
