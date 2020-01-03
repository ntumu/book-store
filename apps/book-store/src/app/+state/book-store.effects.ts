import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { CommonService } from 'libs/services/src/lib/common/common.service';
import { BookStorePartialState } from './book-store.reducer';
import { map } from 'rxjs/operators'
import {
  LoadBookStore,
  BookStoreLoaded,
  BookStoreLoadError,
  BookStoreActionTypes
} from './book-store.actions';

@Injectable()
export class BookStoreEffects {
  @Effect() loadBookStore$ = this.dataPersistence.fetch(
    BookStoreActionTypes.LoadBookStore,
    {
      run: (action: LoadBookStore, state: BookStorePartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return this.commonService.getBooks(action.payload).pipe(map(data => {
          return new BookStoreLoaded(data.items);
        }));
        
      },

      onError: (action: LoadBookStore, error) => {
        console.error('Error', error);
        return new BookStoreLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<BookStorePartialState>,
    private commonService: CommonService
  ) {}
}
