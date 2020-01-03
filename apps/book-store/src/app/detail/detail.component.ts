import { Component, OnInit } from '@angular/core';
import { BookStoreFacade } from '../+state/book-store.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'master-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  selectedBook: any;

  constructor(private bookStoreFacade: BookStoreFacade, private router: Router) { }

  ngOnInit() {
    this.bookStoreFacade.selectedBookStore$.subscribe(book => {
      if (book) {
        console.log('selected book details', book);
        this.selectedBook = book;
      }
    });
  }

  buyNow(selectedBookId) {
    this.bookStoreFacade.dispatchSelectedBook(selectedBookId);
    this.router.navigate(['billing-detail']);
  }

  addToCart(selectedBookId) {
    this.bookStoreFacade.dispatchSelectedBookToCart(selectedBookId);
  }
}
