import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ShortenPipe } from '../shorten.pipe';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShortenPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
  ],
  providers: [],
})
export class RecipesModule {}
