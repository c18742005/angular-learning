import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dsService: DataStorageService, private recipesService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    if(this.recipesService.getRecipes().length === 0) {
      return this.dsService.fetchRecipes();
    }

    return this.recipesService.getRecipes();
  }
}