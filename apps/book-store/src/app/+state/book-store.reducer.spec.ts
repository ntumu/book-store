import { BookStoreLoaded } from './book-store.actions';
import {
  BookStoreState,
  Entity,
  initialState,
  reducer
} from './book-store.reducer';

describe('BookStore Reducer', () => {
  const getBookStoreId = it => it['id'];
  let createBookStore;

  beforeEach(() => {
    createBookStore = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid BookStore actions ', () => {
    it('should return set the list of known BookStore', () => {
      const bookStores = [
        createBookStore('PRODUCT-AAA'),
        createBookStore('PRODUCT-zzz')
      ];
      const action = new BookStoreLoaded(bookStores);
      const result: BookStoreState = reducer(initialState, action);
      const selId: string = getBookStoreId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
