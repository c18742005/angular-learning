import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/libs/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  public shoppingForm: FormGroup;
  public subscription: Subscription;
  public editMode: boolean = false;
  public editedItemIndex: number;
  public editedIngredient: Ingredient;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    this.subscription = this.shoppingListService.ingredientToEdit.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedIngredient = this.shoppingListService.getIngredient(index);

      this.shoppingForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    const newIngredient = new Ingredient(
      this.shoppingForm.value.name,
      this.shoppingForm.value.amount
    );

    if(this.editMode) {
      this.shoppingListService.editIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.shoppingForm.reset();
  }

  onDelete(): void {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.shoppingForm.reset();
  }
}
