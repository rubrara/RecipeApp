import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable()
export class AuthService {
  token: string | any;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  }

  singinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.router.navigate(['/']);
        firebase
          .auth()
          .currentUser?.getIdToken()
          .then((token) => (this.token = token));
        console.log(firebase.auth().currentUser);
      })
      .catch((error) => console.log(error));
  }

  signoutUser() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.token = null;
        console.log(firebase.auth().currentUser);
      })
      .catch((err) => console.log(err));
  }

  getToken() {
    firebase
      .auth()
      .currentUser?.getIdToken()
      .then((token) => (this.token = token));

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
