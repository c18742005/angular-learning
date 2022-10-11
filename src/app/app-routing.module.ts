import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from './components/recipes/recipes-resolver.service';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', 
    component: RecipesComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component:  RecipeEditComponent},
      { path: ':id', component:  RecipeDetailComponent, resolve: [RecipesResolverService]},
      { path: ':id/edit', component:  RecipeEditComponent}
  ]},
  { path: 'shopping-list', component: ShoppingListComponent, resolve: [RecipesResolverService] },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/recipes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
