import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [new Recipe(
    'A Test Recipe', 
    'This is simply a test', 
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
  ),
  new Recipe(
    'A Different Test Recipe', 
    'This is another test', 
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
  )];

  @Output() public recipeIsSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe): void {
    this.recipeIsSelected.emit(recipe);
  }

}
