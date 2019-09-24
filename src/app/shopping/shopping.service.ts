import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dictionary, get, omit, sumBy, values } from 'lodash';

import { ICartProduct, IProduct } from './shopping.model';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  // tslint:disable-next-line: variable-name
  private readonly _cart: BehaviorSubject<ICartProduct[]> = new BehaviorSubject([]);
  readonly cart$: Observable<ICartProduct[]> = this._cart.asObservable();
  // tslint:disable-next-line: variable-name
  private readonly _cartMap: BehaviorSubject<Dictionary<ICartProduct>> = new BehaviorSubject({});
  readonly cartMap$: Observable<Dictionary<ICartProduct>> = this._cartMap.asObservable();
  // tslint:disable-next-line: variable-name
  private readonly _cartTotal: BehaviorSubject<number> = new BehaviorSubject(0);
  readonly cartTotal$: Observable<number> = this._cartTotal.asObservable();

  get cart(): ICartProduct[] {
    return this._cart.getValue();
  }
  get cartMap(): Dictionary<ICartProduct> {
    return this._cartMap.getValue();
  }

  get cartTotal(): number {
    return this._cartTotal.getValue();
  }

  addProduct(product: IProduct, quantity: number): void {
    this.updateCartFromMap({
      ...this.cartMap,
      [product.id]: {
        product,
        quantity: get(this.cartMap, product.id)
          ? get(this.cartMap, product.id).quantity + quantity
          : quantity
      }
    });
  }

  deleteProduct(productId: number): void {
    if (this.cartMap[productId]) {
      this.updateCartFromMap(omit(this.cartMap, productId));
    } else {
      throw new Error(`Product ${productId} cannot be deleted`);
    }
  }

  increaseProductQuantity(productId: number): void {
    if (this.cartMap[productId]) {
      this.updateCartFromMap({
        ...this.cartMap,
        [productId]: {
          ...this.cartMap[productId],
          quantity: this.cartMap[productId].quantity + 1
        }
      });
    } else {
      throw new Error(`Product ${productId} does not exist`);
    }
  }

  decreaseProductQuantity(productId: number): void {
    if (this.cartMap[productId]) {
      if (this.cartMap[productId].quantity <= 1) {
        throw new Error(`Not enough quantity to decrease product ${productId} quantity`);
      } else {
        this.updateCartFromMap({
          ...this.cartMap,
          [productId]: {
            ...this.cartMap[productId],
            quantity: this.cartMap[productId].quantity - 1
          }
        });
      }
    } else {
      throw new Error(`Product ${productId} does not exist`);
    }
  }

  private updateCartFromMap(cartMap: Dictionary<ICartProduct>): void {
    this._cartMap.next(cartMap);
    this._cart.next(values(cartMap));
    this._cartTotal.next(
      sumBy(this.cart, cartProduct => cartProduct.product.price * cartProduct.quantity)
    );
  }
}
