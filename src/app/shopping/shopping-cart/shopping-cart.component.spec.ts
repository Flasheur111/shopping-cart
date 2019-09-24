import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { times } from 'lodash';
import { TestUtils } from 'src/test/test-utils';
import { Subscription } from 'rxjs';
import { SimpleChange } from '@angular/core';

import { ICartProduct, IProduct } from '../shopping.model';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  let cartProducts: ICartProduct[];
  let cartTotal: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, TranslateModule.forRoot()],
      declarations: [ShoppingCartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cartProducts = times(3, index => ({
      ...TestUtils.createSpyObjWithoutMethods<ICartProduct>(`cartProducts-${index}`),
      quantity: index
    }));
    cartTotal = 10;
    component.cartProducts = cartProducts;
    component.cartTotal = cartTotal;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a cartProducts input', () => {
    expect(component.cartProducts).toEqual(cartProducts);
  });

  it('should have a cartTotal input', () => {
    expect(component.cartTotal).toEqual(cartTotal);
  });

  describe('when deleting a product', () => {
    let event: any;
    let subscription: Subscription;
    let productId: number;

    beforeEach(() => {
      event = jasmine.createSpy('event');
      subscription = component.productDelete.subscribe(event);

      productId = 123;
      component.productDelete.emit({ productId });
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should emit an event with productId', () => {
      expect(event).toHaveBeenCalledWith({ productId });
    });
  });

  describe('when increasing a product quantity', () => {
    let event: any;
    let subscription: Subscription;
    let productId: number;

    beforeEach(() => {
      event = jasmine.createSpy('event');
      subscription = component.productQuantityIncrease.subscribe(event);

      productId = 123;
      component.productQuantityIncrease.emit({ productId });
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should emit an event with productId', () => {
      expect(event).toHaveBeenCalledWith({ productId });
    });
  });

  describe('when decreasing a product quantity', () => {
    let event: any;
    let subscription: Subscription;
    let productId: number;

    beforeEach(() => {
      event = jasmine.createSpy('event');
      subscription = component.productQuantityDecrease.subscribe(event);

      productId = 123;
      component.productQuantityDecrease.emit({ productId });
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should emit an event with productId', () => {
      expect(event).toHaveBeenCalledWith({ productId });
    });
  });

  describe('when changes are detected', () => {
    describe('when cartProducts is changing', () => {
      beforeEach(() => {
        cartProducts = [
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'a'
            }
          },
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'b'
            }
          }
        ];
        component.cartProducts = cartProducts;
        component.ngOnChanges({
          cartProducts: TestUtils.createSpyObjWithoutMethods<SimpleChange>('change')
        });
      });

      it('should reorder cartProducts on name column by descending order', () => {
        expect(component.filteredProducts).toEqual([cartProducts[1], cartProducts[0]]);
      });
    });
  });

  describe('when rotating column sorting', () => {
    describe('when sorting is descending', () => {
      beforeEach(() => {
        component.sortOrder = 'desc';
        cartProducts = [
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'a'
            }
          },
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'b'
            }
          }
        ];
        component.cartProducts = cartProducts;
        component.updateColumnSorting('name');
      });

      it('should update the sortOrder to ascending', () => {
        expect(component.sortOrder).toEqual('asc');
      });

      it('should reorder cartProducts on name column by ascending order', () => {
        expect(component.filteredProducts).toEqual(cartProducts);
      });
    });

    describe('when sorting is ascending', () => {
      beforeEach(() => {
        component.sortOrder = 'asc';
        cartProducts = [
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'a'
            }
          },
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'b'
            }
          }
        ];
        component.cartProducts = cartProducts;
        component.updateColumnSorting('name');
      });

      it('should reset the sortOrder', () => {
        expect(component.sortOrder).toEqual('');
      });

      it('should NOT reorder cartProducts on name column', () => {
        expect(component.filteredProducts).toEqual(cartProducts);
      });
    });

    describe('when sorting is empty', () => {
      beforeEach(() => {
        component.sortOrder = '';
        cartProducts = [
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'a'
            }
          },
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'b'
            }
          }
        ];
        component.cartProducts = cartProducts;
        component.updateColumnSorting('name');
      });

      it('should update the sortOrder to descending', () => {
        expect(component.sortOrder).toEqual('desc');
      });

      it('should reorder cartProducts on name column by descending order', () => {
        expect(component.filteredProducts).toEqual([cartProducts[1], cartProducts[0]]);
      });
    });

    describe('when a new column is selected', () => {
      beforeEach(() => {
        component.sortOrder = 'desc';
        cartProducts = [
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'a',
              price: 1
            }
          },
          {
            quantity: 1,
            product: {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              name: 'b',
              price: 2
            }
          }
        ];
        component.cartProducts = cartProducts;
        component.updateColumnSorting('price');
      });

      it('should set the sortOrder to descending', () => {
        expect(component.sortOrder).toEqual('desc');
      });

      it('should set the sortedColumn to the new column', () => {
        expect(component.sortedColumn).toEqual('price');
      });

      it('should reorder cartProducts on price column by descending order', () => {
        expect(component.filteredProducts).toEqual([cartProducts[1], cartProducts[0]]);
      });
    });
  });
});
