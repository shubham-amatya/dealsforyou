import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemWishlistComponent } from './item-wishlist/item-wishlist.component';
import { ItemCardComponent } from './item-card/item-card.component';

@NgModule({
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbDropdownModule
  ],
  declarations: [
    ItemListComponent, 
    ItemWishlistComponent, 
    ItemCardComponent
  ]
})
export class ItemModule { }
