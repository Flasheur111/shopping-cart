import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CatalogService } from './shopping/catalog.service';
import { IProduct } from './shopping/shopping.model';
import { ShoppingService } from './shopping/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public catalogService: CatalogService,
    public shoppingService: ShoppingService,
    private translateService: TranslateService
  ) {
    this.initTranslate();
    this.initShop();
  }

  addProduct($event: { product: IProduct; quantity: number }): void {
    this.shoppingService.addProduct($event.product, $event.quantity);
  }

  deleteProduct($event: { productId: number }): void {
    this.shoppingService.deleteProduct($event.productId);
  }

  increaseProductQuantity($event: { productId: number }): void {
    this.shoppingService.increaseProductQuantity($event.productId);
  }

  decreaseProductQuantity($event: { productId: number }): void {
    this.shoppingService.decreaseProductQuantity($event.productId);
  }

  private initShop(): void {
    this.catalogService.initShop();
  }

  private initTranslate(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
