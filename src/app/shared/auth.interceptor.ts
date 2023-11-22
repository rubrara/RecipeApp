import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const copiedReq = req.clone({headers: req.headers.set("", "")});
    console.log('Intercepted', req);

    return this.store
      .select('auth')
      .pipe(take(1))
      .pipe(
        switchMap((authState: fromAuth.AuthState) => {
          const copiedReq = req.clone({
            params: req.params.set('auth', authState.token),
          });
          return next.handle(copiedReq);
        })
      );
  }
}
