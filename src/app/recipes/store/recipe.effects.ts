import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromRecipe from './recipe.reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  urlDB: string =
    'https://ng-recipe-book-74bde-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) {}

  recipeStore = createEffect(
    () =>
      this.actions$.pipe(ofType(RecipeActions.STORE_RECIPES)).pipe(
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
          const req = new HttpRequest(
            'PUT',
            this.urlDB + 'recipes.json',
            state.recipes,
            {
              reportProgress: true,
              // params: new HttpParams().set('auth', token), // go setirame vo shared/auth.interceptor.ts
            }
          );

          return this.http.request(req);
        })
      ),
    { dispatch: false }
  );

  recipeFetch = createEffect(() =>
    this.actions$.pipe(ofType(RecipeActions.FETCH_RECIPES)).pipe(
      switchMap((action: RecipeActions.FetchRecipes) => {
        return this.http.get<Recipe[]>(this.urlDB + 'recipes.json', {
          // params: new HttpParams().set('auth', token), // go setirame vo shared/auth.interceptor.ts
          observe: 'body',
          responseType: 'json',
        });
      }),
      map((recipes) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes,
        };
      })
    )
  );
}
