import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';

import { Item } from "../item.model";
import { ItemService } from "../item.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {  
  isWishList = false;
  
  items: Item[] = [];
  
  collectionSize = 10;
  maxSize = 10;
  pageSize = 10;
  page = 1;
  rotate = true;
  boundaryLinks = true;
  
  private itemsSub: Subscription;
  
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private itemService: ItemService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.itemService.query.page = this.page;      
    this.itemService.query.pageSize = this.pageSize;
    this.itemService.getItems();
    setInterval(() => {
      this.itemService.getItems();
    }, 60000);
    this.itemsSub = this.itemService
    .getItemsListener()
    .subscribe((itemData: { items: Item[]; collectionSize: number }) => {
      this.spinnerService.hide();
      this.collectionSize = itemData.collectionSize;
      this.items = itemData.items;
    });
  }
  
  onPageChange() {
    this.spinnerService.show();
    this.itemService.query.page = this.page;      
    this.itemService.query.pageSize = this.pageSize;
    this.itemService.getItems();
  }
  
  ngOnDestroy() {
    if(this.itemsSub){
      this.itemsSub.unsubscribe();
    }
  }
  
  getIsInWishList(inWishListOf: string[]): boolean {
    if(inWishListOf.includes(this.authService.getUserId())) {
      return true;
    }
    return false;
  }
}