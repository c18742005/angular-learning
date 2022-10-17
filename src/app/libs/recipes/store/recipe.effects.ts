import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import * as fromApp from "../../../store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipe.actions";


@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions, 
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }
  
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>( 
        'https://recipe-book-b64d2-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      }
    )}),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.post<Recipe[]>( 
        'https://recipe-book-b64d2-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipesState.recipes
      );
    })
  );

}