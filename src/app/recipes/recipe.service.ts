import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes = [
    new Recipe(
      'Tasty Schnitzel',
      'on eyes',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-S_WhhU8im2zf-xhdonMqVkj2lmYCVFo7A&usqp=CAU',
      [new Ingredient('Meat', 1), new Ingredient('Friench Fries', 20)]
    ),
    new Recipe(
      'eggss',
      'on eye2s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-S_WhhU8im2zf-xhdonMqVkj2lmYCVFo7A&usqp=CAU',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.at(index);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
