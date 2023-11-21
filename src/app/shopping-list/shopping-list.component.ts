import { Observable } from 'rxjs';
import { Ingredient } from './../shared/Ingredient.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingListState!: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
}
