import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from 'src/app/libs/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  // private recipes: Recipe[] = [new Recipe(
  //   'Spaghetti Bolognese', 
  //   'An Italian classic dish', 
  //   'https://www.allrecipes.com/thmb/NAQwIXIGrW7BoFx5NE6A9glvEzs=/2000x2000/filters:no_upscale()/254517-spaghetti-sauce-with-fresh-tomatoes-1x1-80-d14fe1e1a3ce4b01bb6afd5d4711855a.jpg',
  //   [new Ingredient('Spaghetti', 1), new Ingredient('Tomatoes', 5), new Ingredient('Mince', 1), new Ingredient('Onion', 1) ]
  // ),
  // new Recipe(
  //   'Fajitas', 
  //   'A Mexican classic dish', 
  //   'https://www.mygorgeousrecipes.com/wp-content/uploads/2019/01/Healthy-Chicken-Fajitas-4.jpg',
  //   [new Ingredient('Chicken', 1), new Ingredient('Wraps', 4), new Ingredient('Bell Pepper', 1), new Ingredient('Onion', 1) ]
  // )];
  
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
