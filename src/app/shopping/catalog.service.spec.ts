import { async, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { keyBy } from 'lodash';

import products from '../../assets/products.json';

import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let catalogService: CatalogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        // App
        CatalogService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    catalogService = TestBed.get(CatalogService);
  });

  describe('when initialising the shop', () => {
    let productsEvent: any;
    let productsSubscription: Subscription;

    let productsMapEvent: any;
    let productsMapSubscription: Subscription;

    beforeEach(() => {
      productsEvent = jasmine.createSpy('event');
      productsSubscription = catalogService.products$.subscribe(productsEvent);
      productsMapEvent = jasmine.createSpy('event');
      productsMapSubscription = catalogService.productsMap$.subscribe(productsMapEvent);
      catalogService.initShop();
    });

    it('should load the products', () => {
      expect(productsEvent).toHaveBeenCalledWith(products);
    });

    it('should load the products rearranged to a map', () => {
      expect(productsMapEvent).toHaveBeenCalledWith(keyBy(products, 'id'));
    });
  });
});
