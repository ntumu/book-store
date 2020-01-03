import { Component, OnInit } from '@angular/core';
import { BookStoreFacade } from '../+state/book-store.facade';

@Component({
  selector: 'master-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collectionList: any;
  constructor(private bookStoreFacade: BookStoreFacade) { }

  ngOnInit() {
    this.bookStoreFacade.collectionBookList$.subscribe(list => {
      if (list) {
        console.log('cacollection list in collection page', list);
        this.collectionList = list;
      }
    });
  }
}
