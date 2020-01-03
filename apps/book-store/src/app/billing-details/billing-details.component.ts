import { Component, OnInit } from '@angular/core';
import { BookStoreFacade } from '../+state/book-store.facade';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'master-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  selectedBook: any;
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  
  constructor(private bookStoreFacade: BookStoreFacade, 
    private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    

    this.createForm();
    this.setChangeValidate();
  }
  
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'phone': [null, Validators.required],
      'address': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }


  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  onSubmit(post) {
    console.log('post - billing details', post);
    //this.post = post;

    this.bookStoreFacade.selectedBookStore$.subscribe(book => {
      if (book) {
        console.log('selected book details', book);
        this.bookStoreFacade.dispatchPurchasedBooks(book);
      }
    });
    
  }
}
