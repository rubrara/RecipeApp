import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes = [
    new Recipe(
      'Tasty Schnitzel',
      'on eyes',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpnuAJhrD37tIRU-mR2DMU01nR85v-i5Maw&usqp=CAU',
      [new Ingredient('Meat', 1), new Ingredient('Friench Fries', 20)]
    ),
    new Recipe(
      'eggss',
      'on eye2s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-S_WhhU8im2zf-xhdonMqVkj2lmYCVFo7A&usqp=CAU',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.at(index);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe | any) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
