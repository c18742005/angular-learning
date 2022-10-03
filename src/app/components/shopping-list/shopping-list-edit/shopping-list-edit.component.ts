import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) public ingredientNameInput!: ElementRef;
  @ViewChild('amountInput', { static: false }) public ingredientAmountInput!: ElementRef;
  @Output() public ingredientAdded = new EventEmitter<Ingredient>();
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  public onAddIngredient(): void {
    const newIngredient = new Ingredient(
      this.ingredientNameInput.nativeElement.value, 
      this.ingredientAmountInput.nativeElement.value
    );

    this.shoppingListService.addIngredient(newIngredient);
  }
}
