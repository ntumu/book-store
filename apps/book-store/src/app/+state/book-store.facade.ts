import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { BookStorePartialState } from './book-store.reducer';
import { bookStoreQuery } from './book-store.selectors';
import { LoadBookStore, LoadSelectedBookStore, AddBooksToCart, AddBooksToCollection } from './book-store.actions';

@Injectable()
export class BookStoreFacade {
  loaded$ = this.store.pipe(select(bookStoreQuery.getLoaded));
  allBookStore$ = this.store.pipe(select(bookStoreQuery.getAllBookStore));
  selectedBookStore$ = this.store.pipe(select(bookStoreQuery.getSelectedBookStore));
  cartBookList$ = this.store.pipe(select(bookStoreQuery.getCartBooksList));
  collectionBookList$ = this.store.pipe(select(bookStoreQuery.getCollectionBookList));

  constructor(private store: Store<BookStorePartialState>) {}

  loadAll(queryParams) {
    this.store.dispatch(new LoadBookStore(queryParams));
  }

  dispatchSelectedBook(selectedBook) {
    this.store.dispatch(new LoadSelectedBookStore(selectedBook));
  }

  dispatchSelectedBookToCart(selectedBook) {
    this.store.dispatch(new AddBooksToCart(selectedBook));
  }

  dispatchPurchasedBooks(purchasedBook) {
    this.store.dispatch(new AddBooksToCollection(purchasedBook));
  }
}
