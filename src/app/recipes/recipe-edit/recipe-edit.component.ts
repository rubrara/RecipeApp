import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number | any;
  editMode: boolean = false;
  recipeForm: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName: string | undefined = '';
    let description: string | undefined = '';
    let imgUrl: string | undefined = '';
    let recipeIngredients: any = new FormArray([]);

    if (this.editMode) {
      this.store
        .select('recipes')
        .pipe(take(1))
        .subscribe((recipeState: fromRecipe.RecipeState) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe?.name;
          imgUrl = recipe?.imagePath;
          description = recipe?.description;
          if (recipe?.['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imgUrl, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value('name'),
    //   this.recipeForm.value('description'),

    //   this.recipeForm.value('imagePath'),
    //   this.recipeForm.value('ingredients')
    // );

    if (this.editMode) {
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          index: this.id,
          updatedRecipe: this.recipeForm.value,
        })
      );
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
