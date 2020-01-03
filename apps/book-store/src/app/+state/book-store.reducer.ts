import { BookStoreAction, BookStoreActionTypes } from './book-store.actions';

export const BOOKSTORE_FEATURE_KEY = 'bookStore';

/**
 * Interface for the 'BookStore' data used in
 *  - BookStoreState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface BookStoreState {
  list: Entity[]; // list of BookStore; analogous to a sql normalized table
  selectedId?: string | number; // which BookStore record has been selected
  loaded: boolean; // has the BookStore list been loaded
  error?: any; // last none error (if any)
  cartList: Entity[];
  collectionList: Entity[];
}

export interface BookStorePartialState {
  readonly [BOOKSTORE_FEATURE_KEY]: BookStoreState;
}

export const initialState: BookStoreState = {
  list: [],
  loaded: false,
  cartList: [],
  collectionList: []
};

export function reducer(
  state: BookStoreState = initialState,
  action: BookStoreAction
): BookStoreState {
  switch (action.type) {
    case BookStoreActionTypes.BookStoreLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
    case BookStoreActionTypes.LoadSelectedBookStore: {
      state = {
        ...state,
        selectedId: action.payload,
      };
      break;
    }
    case BookStoreActionTypes.AddBooksToCart: {
      state = {
        ...state,
        cartList: [action.payload, ...state.cartList]
      };
      break;
    }
    case BookStoreActionTypes.AddBooksToCollection: {
      state = {
        ...state,
        collectionList: [action.payload, ...state.collectionList]
      };
      break;
    }
  }
  return state;
}
