import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./libs/auth/auth-interceptor.service";
import { RecipeService } from "./libs/recipes/recipe.service";
import { ShoppingListService } from "./libs/shopping-list/shopping-list.service";

@NgModule({
  providers: [
    RecipeService, 
    ShoppingListService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class CoreModule { }