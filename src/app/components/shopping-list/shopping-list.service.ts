import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5), 
    new Ingredient('Tomatoes', 10)
  ];
  
  public ingredientsChanged = new EventEmitter<Ingredient[]>();

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}