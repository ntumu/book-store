import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatNavList,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatBadgeModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBookStore from './+state/book-store.reducer';
import { BookStoreEffects } from './+state/book-store.effects';
import { BookStoreFacade } from './+state/book-store.facade';
import { NxModule } from '@nrwl/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailComponent } from './detail/detail.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    DashboardComponent,
    CartComponent,
    CollectionComponent,
    DetailComponent,
    BillingDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,    
    MatBadgeModule,
    MatFormFieldModule,
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule,
    AppRoutingModule,    
    NxModule.forRoot(),
    StoreModule.forRoot(
      {'bookStore': fromBookStore.reducer},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([BookStoreEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(
      fromBookStore.BOOKSTORE_FEATURE_KEY,
      fromBookStore.reducer
    )
  ],
  providers: [BookStoreFacade],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    SideNavComponent,
    HeaderComponent,
    MatNavList,
    DashboardComponent,
    CartComponent,
    CollectionComponent,
    DetailComponent,
    BillingDetailsComponent
  ]
})
export class AppModule {}
