import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  urlDB: string =
    'https://ng-recipe-book-74bde-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer asfabindsawo'
    );

    // return this.http.put(
    //   this.urlDB + 'recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     headers: headers,
    //     params: new HttpParams().set('auth', token) // go setirame vo shared/auth.interceptor.ts
    //   }
    // );

    // progress
    const req = new HttpRequest(
      'PUT',
      this.urlDB + 'recipes.json',
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
        // params: new HttpParams().set('auth', token), // go setirame vo shared/auth.interceptor.ts
      }
    );

    return this.http.request(req);
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    // this.http
    //   .get(this.urlDB + 'recipes.json?auth=' + token, {
    //     observe: 'body', // response, events
    //     responseType: 'json', // text, blob, arraybuffer
    //   })
    this.http
      .get<Recipe[]>(this.urlDB + 'recipes.json', {
        // params: new HttpParams().set('auth', token), // go setirame vo shared/auth.interceptor.ts
      })
      .pipe(
        map((recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
