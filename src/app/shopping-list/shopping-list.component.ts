import { Observable } from 'rxjs';
import { Ingredient } from './../shared/Ingredient.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'void',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        group([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
          }),
          animate(400),
          style({
            background: 'lightgreen',
            color: 'white',
            opacity: 1,
          }),
          animate(900),
        ]),
      ]),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit {
  shoppingListState!: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
}
