import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionary, get } from 'lodash';

import { IProduct } from '../shopping.model';

@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.scss']
})
export class ShoppingItemsComponent {
  @Input() products: IProduct[];
  @Input() productsMap: Dictionary<IProduct>;
  @Output() productAdd: EventEmitter<{ product: IProduct; quantity: number }> = new EventEmitter();

  get productSelected() {
    return get(this.productsMap, this.selectionForm.get('productId').value);
  }

  get quantitySelected() {
    return this.selectionForm.get('quantity').value;
  }

  get quantityFieldHasErrors() {
    return this.selectionForm.get('quantity').invalid;
  }

  selectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  addProduct(product: IProduct, quantity: number): void {
    this.productAdd.emit({ product, quantity });
  }

  private initForm(): void {
    this.selectionForm = this.formBuilder.group({
      productId: [0, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }
}
