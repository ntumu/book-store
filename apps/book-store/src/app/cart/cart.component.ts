import { Component, OnInit } from '@angular/core';
import { BookStoreFacade } from '../+state/book-store.facade';

@Component({
  selector: 'master-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: any;
  constructor(private bookStoreFacade: BookStoreFacade) { }

  ngOnInit() {
    this.bookStoreFacade.cartBookList$.subscribe(list => {
      if (list) {
        console.log('cart list in cart page', list);
        this.cartList = list;
      }
    });
  }
}
