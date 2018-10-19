import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';

import { Item } from "../item.model";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-item-wishlist',
  templateUrl: './item-wishlist.component.html',
  styleUrls: ['./item-wishlist.component.scss']
})
export class ItemWishlistComponent implements OnInit, OnDestroy {
  isWishList = true;
  
  wishlist: Item[] = [];
  private wishListSub: Subscription;

  collectionSize = 10;
  maxSize = 10;
  pageSize = 10;
  page = 1;
  rotate = true;
  boundaryLinks = true;
  
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private itemService: ItemService,
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.itemService.query.page = this.page;      
    this.itemService.query.pageSize = this.pageSize;
    this.itemService.getWishListItems();
    setInterval(() => {
      this.itemService.getWishListItems();
    }, 60000);
    this.wishListSub = this.itemService
    .getWishListListener()
    .subscribe((wishListData: { wishlist: Item[]; collectionSize: number }) => {
      this.spinnerService.hide();
      this.wishlist = wishListData.wishlist;
      this.collectionSize = wishListData.collectionSize;
    });
  }
  
  onPageChange() {
    this.spinnerService.show();
    this.itemService.query.page = this.page;      
    this.itemService.query.pageSize = this.pageSize;
    this.itemService.getWishListItems();
  }
  
  ngOnDestroy() {
    if(this.wishListSub){
      this.wishListSub.unsubscribe();
    }
  }
}
