import { Entity, BookStoreState } from './book-store.reducer';
import { bookStoreQuery } from './book-store.selectors';

describe('BookStore Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBookStoreId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createBookStore = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      bookStore: {
        list: [
          createBookStore('PRODUCT-AAA'),
          createBookStore('PRODUCT-BBB'),
          createBookStore('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('BookStore Selectors', () => {
    it('getAllBookStore() should return the list of BookStore', () => {
      const results = bookStoreQuery.getAllBookStore(storeState);
      const selId = getBookStoreId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedBookStore() should return the selected Entity', () => {
      const result = bookStoreQuery.getSelectedBookStore(storeState);
      const selId = getBookStoreId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = bookStoreQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = bookStoreQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
