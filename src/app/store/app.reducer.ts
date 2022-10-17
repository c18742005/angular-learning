import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../libs/auth/store/auth.reducer';
import * as fromRecipes from '../libs/recipes/store/recipe.reducer';
import * as fromShoppingList from '../libs/shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
  recipes: fromRecipes.State
};

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer
};