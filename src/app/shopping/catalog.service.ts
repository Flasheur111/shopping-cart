import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dictionary, keyBy } from 'lodash';

import products from '../../assets/products.json';

import { IProduct } from './shopping.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  // tslint:disable-next-line: variable-name
  private readonly _products: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  readonly products$: Observable<IProduct[]> = this._products.asObservable();
  // tslint:disable-next-line: variable-name
  private readonly _productsMap: BehaviorSubject<Dictionary<IProduct>> = new BehaviorSubject({});
  readonly productsMap$: Observable<Dictionary<IProduct>> = this._productsMap.asObservable();

  initShop(): void {
    this._products.next(products);
    this._productsMap.next(keyBy(products, 'id'));
  }
}
