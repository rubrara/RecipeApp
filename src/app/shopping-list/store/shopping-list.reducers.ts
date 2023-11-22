import { Ingredient } from './../../shared/Ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | undefined;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 12)],
  editedIngredient: undefined,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActions
): ShoppingListState {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: undefined,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);

      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: undefined,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredientIndex = action.payload;
      const editedIngredient = { ...state.ingredients[editedIngredientIndex] };
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: editedIngredientIndex,
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: undefined,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
}
