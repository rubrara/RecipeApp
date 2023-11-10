import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'eggs',
      'on eyes',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-S_WhhU8im2zf-xhdonMqVkj2lmYCVFo7A&usqp=CAU'
    ),
    new Recipe(
      'eggss',
      'on eye2s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-S_WhhU8im2zf-xhdonMqVkj2lmYCVFo7A&usqp=CAU'
    ),
  ];

  constructor() {}
}
