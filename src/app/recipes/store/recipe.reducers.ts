import { Ingredient } from 'src/app/shared/Ingredient.model';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';

export interface FeatureState extends fromApp.AppState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
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
  ],
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActions.UPDATE_RECIPE:
      let recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe,
      };
      let recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes,
      };
    case RecipeActions.DELETE_RECIPE:
      let oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes,
      };
    default:
      return state;
  }
}

/// [...actions.payload] --> gi zema actions na immutable nacin, ako ne bea trite tocki togas ce bea mutabilni??
