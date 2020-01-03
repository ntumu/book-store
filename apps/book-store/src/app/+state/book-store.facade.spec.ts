import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { BookStoreEffects } from './book-store.effects';
import { BookStoreFacade } from './book-store.facade';

import { bookStoreQuery } from './book-store.selectors';
import { LoadBookStore, BookStoreLoaded } from './book-store.actions';
import {
  BookStoreState,
  Entity,
  initialState,
  reducer
} from './book-store.reducer';

interface TestSchema {
  bookStore: BookStoreState;
}

describe('BookStoreFacade', () => {
  let facade: BookStoreFacade;
  let store: Store<TestSchema>;
  let createBookStore;

  beforeEach(() => {
    createBookStore = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('bookStore', reducer, { initialState }),
          EffectsModule.forFeature([BookStoreEffects])
        ],
        providers: [BookStoreFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(BookStoreFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allBookStore$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allBookStore$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `BookStoreLoaded` to manually submit list for state management
     */
    it('allBookStore$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allBookStore$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new BookStoreLoaded([createBookStore('AAA'), createBookStore('BBB')])
        );

        list = await readFirst(facade.allBookStore$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
