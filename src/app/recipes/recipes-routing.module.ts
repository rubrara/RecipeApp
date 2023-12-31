import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';

const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      // { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
