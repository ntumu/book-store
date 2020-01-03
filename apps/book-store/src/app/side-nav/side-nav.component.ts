import { Component, OnInit } from '@angular/core';
import { BookStoreFacade } from '../+state/book-store.facade';

@Component({
  selector: 'master-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  cartItemsCount: number;
  purchasedItemsCount: number;
  constructor(private bookStoreFacade: BookStoreFacade) { }

  ngOnInit() {
    this.bookStoreFacade.cartBookList$.subscribe(cartList => {
      if (cartList) {
        console.log('cartbooks', JSON.stringify(cartList));
        this.cartItemsCount = cartList.length > 0 ? cartList.length : null;
      }
    });

    this.bookStoreFacade.collectionBookList$.subscribe(collectionList => {
      if (collectionList) {
        console.log('purchased items', JSON.stringify(collectionList));
        this.purchasedItemsCount = collectionList.length > 0 ? collectionList.length : null;
      }
    });
  }
}
