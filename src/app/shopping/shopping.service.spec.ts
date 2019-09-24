import { async, TestBed } from '@angular/core/testing';
import { TestUtils } from 'src/test/test-utils';

import { ShoppingService } from './shopping.service';
import { IProduct } from './shopping.model';

describe('ShoppingService', () => {
  let shoppingService: ShoppingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        // App
        ShoppingService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    shoppingService = TestBed.get(ShoppingService);
  });

  describe('when constructing', () => {
    it('should have an empty cart', () => {
      expect(shoppingService.cart).toEqual([]);
    });

    it('should have an empty cartMap', () => {
      expect(shoppingService.cartMap).toEqual({});
    });

    it('should have a zero total', () => {
      expect(shoppingService.cartTotal).toEqual(0);
    });
  });

  describe('when adding a product', () => {
    describe('if the product is NOT already added', () => {
      let product: IProduct;

      beforeEach(() => {
        product = {
          ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
          id: 1,
          name: 'a',
          price: 20
        };
        shoppingService.addProduct(product, 1);
      });

      it('should add the product to the cart', () => {
        expect(shoppingService.cart).toEqual([{ product, quantity: 1 }]);
      });

      it('should add the product to the cartMap', () => {
        expect(shoppingService.cartMap).toEqual({ 1: { product, quantity: 1 } });
      });

      it('should add the quantity * product price to the cartTotal', () => {
        expect(shoppingService.cartTotal).toEqual(20);
      });

      describe('if the product is already added', () => {
        beforeEach(() => {
          product = {
            ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
            id: 1,
            name: 'a',
            price: 20
          };
          shoppingService.addProduct(product, 2);
        });

        it('should update the product quantity in the cart', () => {
          expect(shoppingService.cart).toEqual([{ product, quantity: 3 }]);
        });

        it('should update the product quantity in the cartMap', () => {
          expect(shoppingService.cartMap).toEqual({ 1: { product, quantity: 3 } });
        });

        it('should update the quantity * product price in the cartTotal', () => {
          expect(shoppingService.cartTotal).toEqual(60);
        });
      });
    });
  });

  describe('when deleting a product', () => {
    describe('when the product is in the cart', () => {
      beforeEach(() => {
        shoppingService.addProduct(
          {
            ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
            id: 1
          },
          1
        );
        shoppingService.deleteProduct(1);
      });

      it('should remove the product from the cart', () => {
        expect(shoppingService.cart).toEqual([]);
        expect(shoppingService.cartMap).toEqual({});
        expect(shoppingService.cartTotal).toEqual(0);
      });
    });

    describe('when the product is NOT in the cart', () => {
      let fnCall: any;

      beforeEach(() => {
        fnCall = () => shoppingService.deleteProduct(1);
      });

      it('should remove the product from the cart', () => {
        expect(fnCall).toThrowError('Product 1 cannot be deleted');
      });
    });
  });

  describe('when increasing a product quantity', () => {
    describe('when the product exists', () => {
      beforeEach(() => {
        shoppingService.addProduct(
          {
            ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
            id: 1,
            price: 10
          },
          1
        );
        shoppingService.increaseProductQuantity(1);
      });

      it('should increase the quantity by 1', () => {
        expect(shoppingService.cart[0].quantity).toEqual(2);
        expect(shoppingService.cartMap[1].quantity).toEqual(2);
        expect(shoppingService.cartTotal).toEqual(20);
      });
    });

    describe('when the product does NOT exists', () => {
      let fnCall: any;

      beforeEach(() => {
        fnCall = () => shoppingService.increaseProductQuantity(1);
      });

      it('should throw an error', () => {
        expect(fnCall).toThrowError('Product 1 does not exist');
      });
    });
  });

  describe('when decreasing a product quantity', () => {
    describe('when the product exists', () => {
      describe('when quantity is greater than 1', () => {
        beforeEach(() => {
          shoppingService.addProduct(
            {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              id: 1,
              price: 10
            },
            2
          );
          shoppingService.decreaseProductQuantity(1);
        });

        it('should decrease the quantity by 1', () => {
          expect(shoppingService.cart[0].quantity).toEqual(1);
          expect(shoppingService.cartMap[1].quantity).toEqual(1);
          expect(shoppingService.cartTotal).toEqual(10);
        });
      });

      describe('when quantity is less or equal to 1', () => {
        let fnCall: any;

        beforeEach(() => {
          shoppingService.addProduct(
            {
              ...TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
              id: 1,
              price: 10
            },
            1
          );
          fnCall = () => shoppingService.decreaseProductQuantity(1);
        });

        it('should throw an error', () => {
          expect(fnCall).toThrowError('Not enough quantity to decrease product 1 quantity');
        });
      });
    });

    describe('when the product does NOT exists', () => {
      let fnCall: any;

      beforeEach(() => {
        fnCall = () => shoppingService.decreaseProductQuantity(1);
      });

      it('should throw an error', () => {
        expect(fnCall).toThrowError('Product 1 does not exist');
      });
    });
  });
});
