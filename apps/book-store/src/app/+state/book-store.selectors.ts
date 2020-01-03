import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOKSTORE_FEATURE_KEY, BookStoreState } from './book-store.reducer';

// Lookup the 'BookStore' feature state managed by NgRx
const getBookStoreState = createFeatureSelector<BookStoreState>(
  BOOKSTORE_FEATURE_KEY
);

const getLoaded = createSelector(
  getBookStoreState,
  (state: BookStoreState) => state.loaded
);
const getError = createSelector(
  getBookStoreState,
  (state: BookStoreState) => state.error
);

const getAllBookStore = createSelector(
  getBookStoreState,
  getLoaded,
  (state: BookStoreState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);

const getCartBooksList = createSelector(
  getBookStoreState,
  getLoaded,
  (state: BookStoreState, isLoaded) => {
    return isLoaded ? state.cartList : [];
  }
);

const getCollectionBookList = createSelector(
  getBookStoreState,
  getLoaded,
  (state: BookStoreState, isLoaded) => {
    return isLoaded ? state.collectionList : [];
  }
);

const getSelectedId = createSelector(
  getBookStoreState,
  (state: BookStoreState) => state.selectedId
);

const getSelectedBookStore = createSelector(
  getAllBookStore,
  getSelectedId,
  (bookStore, id) => {
    console.log('bookStore', bookStore);
    const result = bookStore.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const bookStoreQuery = {
  getLoaded,
  getError,
  getAllBookStore,
  getSelectedBookStore,
  getCartBooksList,
  getCollectionBookList
};
