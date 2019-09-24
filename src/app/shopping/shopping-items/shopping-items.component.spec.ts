import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Dictionary, times } from 'lodash';
import { Subscription } from 'rxjs';
import { TestUtils } from 'src/test/test-utils';

import { IProduct } from '../shopping.model';

import { ShoppingItemsComponent } from './shopping-items.component';

describe('ShoppingItemsComponent', () => {
  let component: ShoppingItemsComponent;
  let fixture: ComponentFixture<ShoppingItemsComponent>;

  let products: IProduct[];
  let productsMap: Dictionary<IProduct>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // Angular
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ShoppingItemsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    products = times(3, index => ({
      ...TestUtils.createSpyObjWithoutMethods<IProduct>(`product-${index}`),
      id: index
    }));
    productsMap = {
      1: {
        ...TestUtils.createSpyObjWithoutMethods<IProduct>('product-1'),
        id: 1
      }
    };
    component.products = products;
    component.productsMap = productsMap;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a products input', () => {
    expect(component.products).toEqual(products);
  });

  it('should have a productsMap input', () => {
    expect(component.productsMap).toEqual(productsMap);
  });

  describe('when adding a product', () => {
    let event: any;
    let subscription: Subscription;
    let payload: any;

    beforeEach(() => {
      event = jasmine.createSpy('event');
      subscription = component.productAdd.subscribe(event);

      payload = { product: TestUtils.createSpyObjWithoutMethods<IProduct>('product'), quantity: 1 };
      component.productAdd.emit(payload);
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should emit an event with product and quantity added', () => {
      expect(event).toHaveBeenCalledWith(payload);
    });
  });

  describe('when constructing', () => {
    it('should initialise and default the form', () => {
      expect(component.selectionForm.value).toEqual({
        productId: 0,
        quantity: 1
      });
    });
  });

  describe('when validating the form', () => {
    describe('the productId control', () => {
      describe('if empty', () => {
        beforeEach(() => {
          component.selectionForm.get('productId').setValue('');
        });

        it('should be invalid', () => {
          expect(component.selectionForm.get('productId').invalid).toEqual(true);
        });
      });

      describe('if NOT empty', () => {
        beforeEach(() => {
          component.selectionForm.get('productId').setValue(2);
        });

        it('should be invalid', () => {
          expect(component.selectionForm.get('productId').valid).toEqual(true);
        });
      });
    });

    describe('the quantity control', () => {
      describe('if empty', () => {
        beforeEach(() => {
          component.selectionForm.get('quantity').setValue('');
        });

        it('should be invalid', () => {
          expect(component.selectionForm.get('quantity').invalid).toEqual(true);
        });
      });

      describe('if NOT empty', () => {
        describe('if the value is more or equal than 1', () => {
          beforeEach(() => {
            component.selectionForm.get('quantity').setValue(2);
          });

          it('should be invalid', () => {
            expect(component.selectionForm.get('quantity').valid).toEqual(true);
          });
        });

        describe('if the value is less than 1', () => {
          beforeEach(() => {
            component.selectionForm.get('quantity').setValue(0);
          });

          it('should be invalid', () => {
            expect(component.selectionForm.get('quantity').invalid).toEqual(true);
          });
        });
      });
    });
  });

  describe('when adding a product', () => {
    let event: any;
    let subscription: Subscription;
    let product: IProduct;
    let quantity: number;

    beforeEach(() => {
      event = jasmine.createSpy('event');
      subscription = component.productAdd.subscribe(event);
      product = TestUtils.createSpyObjWithoutMethods<IProduct>('product');
      quantity = 10;
      component.addProduct(product, quantity);
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should emit a productAdd event', () => {
      expect(event).toHaveBeenCalledWith({ product, quantity });
    });
  });
});
