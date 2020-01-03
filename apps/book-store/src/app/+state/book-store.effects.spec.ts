import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BookStoreEffects } from './book-store.effects';
import { LoadBookStore, BookStoreLoaded } from './book-store.actions';

describe('BookStoreEffects', () => {
  let actions: Observable<any>;
  let effects: BookStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        BookStoreEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(BookStoreEffects);
  });

  describe('loadBookStore$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadBookStore({}) });
      expect(effects.loadBookStore$).toBeObservable(
        hot('-a-|', { a: new BookStoreLoaded([]) })
      );
    });
  });
});
