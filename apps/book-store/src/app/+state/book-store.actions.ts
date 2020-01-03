import { Action } from '@ngrx/store';
import { Entity } from './book-store.reducer';

export enum BookStoreActionTypes {
  LoadBookStore = '[BookStore] Load BookStore',
  BookStoreLoaded = '[BookStore] BookStore Loaded',
  BookStoreLoadError = '[BookStore] BookStore Load Error',
  LoadSelectedBookStore = '[BookStore] Load Selected BookStore',
  AddBooksToCart = "[BookStore] Add Books to Cart",
  AddBooksToCollection = "[BookStore] Add Books to Collection"
}

export class LoadBookStore implements Action {
  readonly type = BookStoreActionTypes.LoadBookStore;
  constructor(public payload: any) {}
}

export class BookStoreLoadError implements Action {
  readonly type = BookStoreActionTypes.BookStoreLoadError;
  constructor(public payload: any) {}
}

export class BookStoreLoaded implements Action {
  readonly type = BookStoreActionTypes.BookStoreLoaded;
  constructor(public payload: Entity[]) {}
}

export class LoadSelectedBookStore implements Action {
  readonly type = BookStoreActionTypes.LoadSelectedBookStore;
  constructor(public payload: any) {}
}

export class AddBooksToCart implements Action {
  readonly type = BookStoreActionTypes.AddBooksToCart;
  constructor(public payload: any) {}
}

export class AddBooksToCollection implements Action {
  readonly type = BookStoreActionTypes.AddBooksToCollection;
  constructor(public payload: any) {}
}

export type BookStoreAction =
  | LoadBookStore
  | BookStoreLoaded
  | BookStoreLoadError
  | LoadSelectedBookStore
  | AddBooksToCart
  | AddBooksToCollection;

export const fromBookStoreActions = {
  LoadBookStore,
  BookStoreLoaded,
  BookStoreLoadError,
  LoadSelectedBookStore,
  AddBooksToCart,
  AddBooksToCollection
};
