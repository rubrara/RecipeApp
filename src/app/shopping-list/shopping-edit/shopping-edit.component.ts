import { ShoppingListService } from './../shopping-list.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef | any;
  @ViewChild('amountInput') amountInputRef: ElementRef | any;

  constructor(private slService: ShoppingListService) {}

  onAddItem() {
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );

    this.slService.addIngredient(newIngredient);
  }
}
