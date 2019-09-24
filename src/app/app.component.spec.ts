import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TestUtils } from 'src/test/test-utils';

import { AppComponent } from './app.component';
import { ShoppingModule } from './shopping/shopping.module';
import { CatalogService } from './shopping/catalog.service';
import { ShoppingService } from './shopping/shopping.service';
import { IProduct } from './shopping/shopping.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let catalogService: CatalogService;
  let shoppingService: ShoppingService;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // App
        ShoppingModule,
        // Other libraries
        TranslateModule.forRoot()
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    catalogService = TestBed.get(CatalogService);
    shoppingService = TestBed.get(ShoppingService);
    translateService = TestBed.get(TranslateService);
  });

  beforeEach(() => {
    spyOn(translateService, 'setDefaultLang');
    spyOn(translateService, 'use');
    spyOn(catalogService, 'initShop');
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('when constructing', () => {
    it('should set the default lang of the translation', () => {
      expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
    });

    it('should use english language', () => {
      expect(translateService.use).toHaveBeenCalledWith('en');
    });

    it('should init the shop', () => {
      expect(catalogService.initShop).toHaveBeenCalled();
    });
  });

  describe('when adding a product', () => {
    let payload: any;
    beforeEach(() => {
      payload = {
        product: TestUtils.createSpyObjWithoutMethods<IProduct>('product'),
        quantity: 1
      };
      spyOn(shoppingService, 'addProduct');
      component.addProduct(payload);
    });

    it('should call addProduct via the shopping service', () => {
      expect(shoppingService.addProduct).toHaveBeenCalledWith(payload.product, payload.quantity);
    });
  });

  describe('when deleting a product', () => {
    let payload: any;

    beforeEach(() => {
      payload = {
        productId: 1
      };
      spyOn(shoppingService, 'deleteProduct');
      component.deleteProduct(payload);
    });

    it('should call deleteProduct via the shopping service', () => {
      expect(shoppingService.deleteProduct).toHaveBeenCalledWith(payload.productId);
    });
  });

  describe('when increasing a product quantity', () => {
    let payload: any;

    beforeEach(() => {
      payload = {
        productId: 1
      };
      spyOn(shoppingService, 'increaseProductQuantity');
      component.increaseProductQuantity(payload);
    });

    it('should call increaseProductQuantity via the shopping service', () => {
      expect(shoppingService.increaseProductQuantity).toHaveBeenCalledWith(payload.productId);
    });
  });

  describe('when decreasing a product quantity', () => {
    let payload: any;

    beforeEach(() => {
      payload = {
        productId: 1
      };
      spyOn(shoppingService, 'decreaseProductQuantity');
      component.decreaseProductQuantity(payload);
    });

    it('should call decreaseProductQuantity via the shopping service', () => {
      expect(shoppingService.decreaseProductQuantity).toHaveBeenCalledWith(payload.productId);
    });
  });
});
