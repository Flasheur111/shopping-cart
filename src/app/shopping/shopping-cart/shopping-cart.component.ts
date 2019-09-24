import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { get, orderBy, sortBy } from 'lodash';

import { ICartProduct } from '../shopping.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnChanges {
  @Input() cartProducts: ICartProduct[];
  @Input() cartTotal: number;
  @Output() productDelete: EventEmitter<{ productId: number }> = new EventEmitter();
  @Output() productQuantityIncrease: EventEmitter<{ productId: number }> = new EventEmitter();
  @Output() productQuantityDecrease: EventEmitter<{ productId: number }> = new EventEmitter();

  filteredProducts: ICartProduct[];
  sortedColumn = 'name';
  sortOrder = 'desc';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cartProducts) {
      this.applyFilterProducts();
    }
  }

  updateColumnSorting(column: string) {
    if (this.sortedColumn !== column) {
      this.sortOrder = 'desc';
    } else {
      switch (this.sortOrder) {
        case '':
          this.sortOrder = 'desc';
          break;
        case 'desc':
          this.sortOrder = 'asc';
          break;
        default:
          this.sortOrder = '';
          break;
      }
    }

    this.sortedColumn = column;
    this.applyFilterProducts();
  }

  private applyFilterProducts(): void {
    this.filteredProducts =
      this.sortOrder !== ''
        ? orderBy(
            this.cartProducts,
            [`product.${this.sortedColumn}`],
            [this.sortOrder === 'desc' ? 'desc' : 'asc']
          )
        : this.cartProducts;
  }
}
