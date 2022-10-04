import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public id: number
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
