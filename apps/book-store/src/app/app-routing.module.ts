import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailComponent } from './detail/detail.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cart', component: CartComponent },
    { path: 'collection', component: CollectionComponent },
    { path: 'detail', component: DetailComponent},
    { path: 'billing-detail', component: BillingDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 