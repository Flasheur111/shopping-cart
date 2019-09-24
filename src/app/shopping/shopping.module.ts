import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CatalogService } from './catalog.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingItemsComponent } from './shopping-items/shopping-items.component';
import { ShoppingService } from './shopping.service';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Other libraries
    TranslateModule
  ],
  exports: [ShoppingCartComponent, ShoppingItemsComponent],
  declarations: [ShoppingCartComponent, ShoppingItemsComponent],
  providers: [CatalogService, ShoppingService]
})
export class ShoppingModule {}
