import { map, switchMap, Observable, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { from } from 'rxjs';
import firebase from 'firebase/compat/app';
import {} from 'firebase/compat/auth';

@Injectable()
export class AuthEffects {
  authSignup = createEffect(
    () =>
      this.actions$.pipe(ofType(AuthActions.TRY_SIGNUP)).pipe(
        map((action: AuthActions.TrySignup) => {
          return action.payload;
        }),
        switchMap((authData: { username: string; password: string }) => {
          return from(
            firebase
              .auth()
              .createUserWithEmailAndPassword(
                authData.username,
                authData.password
              )
          );
        }),
        switchMap(() => {
          return from(firebase.auth().currentUser?.getIdToken()!);
        }),
        mergeMap((token: string) => {
          return [
            {
              type: AuthActions.SIGNUP,
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token,
            },
          ];
        })
      )
    //  { dispatch: false }
  );

  authSignin = createEffect(
    () =>
      this.actions$.pipe(ofType(AuthActions.TRY_SIGNIN)).pipe(
        map((action: AuthActions.TrySignin) => {
          return action.payload;
        }),
        switchMap((authData: { username: string; password: string }) => {
          return from(
            firebase
              .auth()
              .signInWithEmailAndPassword(authData.username, authData.password)
          );
        }),
        switchMap(() => {
          return from(firebase.auth().currentUser?.getIdToken()!);
        }),
        mergeMap((token: string) => {
          this.router.navigate(['/']);
          return [
            {
              type: AuthActions.SIGNIN,
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token,
            },
          ];
        })
      )
    // { dispatch: false}
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(ofType(AuthActions.LOGOUT)).pipe(
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
