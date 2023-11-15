import { RecipeService } from '../recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Observable, Observer, Subscription, interval, map } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] | any;

  constructor(private recipeService: RecipeService) {}

  numbersObsSubs: Subscription | any;
  numbersObsSubs2: Subscription | any;

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {}
}
