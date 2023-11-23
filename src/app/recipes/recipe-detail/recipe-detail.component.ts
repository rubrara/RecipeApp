import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Observable, take } from 'rxjs';
import * as fromRecipes from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeState!: Observable<fromRecipes.RecipeState>;
  id: number | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipes.FeatureState>
  ) {}

  onAddToShoppingList() {
    this.store
      .select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipes.RecipeState) => {
        this.store.dispatch(
          new ShoppingListActions.AddIngredients(
            recipeState.recipes[this.id].ingredients
          )
        );
      });

    this.router.navigate(['shopping-list']);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
  }
}
