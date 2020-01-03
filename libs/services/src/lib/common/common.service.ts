import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiURL: string = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private httpClient: HttpClient) { }


  // HttpClient API get() method => Fetch books list
  getBooks(params): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    return this.httpClient.get<any>(this.apiURL + params, httpOptions);
  }
}
