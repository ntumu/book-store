import { Component, OnInit } from '@angular/core';
import { BookStoreFacade } from '../+state/book-store.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'master-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchValue: string;
  booksList: any;
  constructor(private bookStoreFacade: BookStoreFacade, private router: Router) { }

  ngOnInit() {
    this.bookStoreFacade.allBookStore$.subscribe(data => {
      if (data) {
        this.booksList = data;
        console.log('booklist', JSON.stringify(this.booksList));
      }
    });
  }

  onSearch() {
    this.bookStoreFacade.loadAll(this.searchValue);
  }

  onSelect(selectedBookId) {
    this.bookStoreFacade.dispatchSelectedBook(selectedBookId);
    this.router.navigate(['/detail']);
  }
  
  buyNow(selectedBookId) {
    this.bookStoreFacade.dispatchSelectedBook(selectedBookId);
    this.router.navigate(['billing-detail']);
  }

  addToCart(selectedBookId) {
    this.bookStoreFacade.dispatchSelectedBookToCart(selectedBookId);
  }
}
