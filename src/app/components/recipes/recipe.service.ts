import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable() 
export class RecipeService {
  public recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] = [new Recipe(
    'Spaghetti Bolognese', 
    'An Italian classic dish', 
    'https://www.allrecipes.com/thmb/NAQwIXIGrW7BoFx5NE6A9glvEzs=/2000x2000/filters:no_upscale()/254517-spaghetti-sauce-with-fresh-tomatoes-1x1-80-d14fe1e1a3ce4b01bb6afd5d4711855a.jpg',
    [new Ingredient('Spaghetti', 1), new Ingredient('Tomatoes', 5), new Ingredient('Mince', 1), new Ingredient('Onion', 1) ]
  ),
  new Recipe(
    'Fajitas', 
    'A Mexican classic dish', 
    'https://www.mygorgeousrecipes.com/wp-content/uploads/2019/01/Healthy-Chicken-Fajitas-4.jpg',
    [new Ingredient('Chicken', 1), new Ingredient('Wraps', 4), new Ingredient('Bell Pepper', 1), new Ingredient('Onion', 1) ]
  )];
  
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}