import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipeState!: Observable<fromRecipes.RecipeState>;

  constructor(private store: Store<fromRecipes.FeatureState>) {}

  numbersObsSubs: Subscription | any;
  numbersObsSubs2: Subscription | any;

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
