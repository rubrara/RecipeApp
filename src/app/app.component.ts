import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RecipeApp';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBiYJrn3K5KYKnZFfEn2V14S25YwGpPUzk',
      authDomain: 'ng-recipe-book-74bde.firebaseapp.com',
      databaseURL:
        'https://ng-recipe-book-74bde-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'ng-recipe-book-74bde',
      storageBucket: 'ng-recipe-book-74bde.appspot.com',
      messagingSenderId: '733157283257',
      appId: '1:733157283257:web:f17af0a7e867d365301268',
    });
  }
}
