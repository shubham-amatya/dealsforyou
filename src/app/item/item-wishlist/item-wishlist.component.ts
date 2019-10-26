import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';

import { Item } from "../item.model";
import { ItemService } from "../item.service";
import { defaultPagination } from "../default-pagination.config";

@Component({
  selector: 'app-item-wishlist',
  templateUrl: './item-wishlist.component.html',
  styleUrls: ['./item-wishlist.component.scss']
})
export class ItemWishlistComponent implements OnInit, OnDestroy {
  isWishList = true;

  wishlist: Item[] = [];
  private wishListSub: Subscription;

  collectionSize = defaultPagination.collectionSize;
  maxSize = defaultPagination.maxSize;
  pageSize = defaultPagination.pageSize;
  page = defaultPagination.page;
  rotate = defaultPagination.rotate;
  boundaryLinks = defaultPagination.boundaryLinks;

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private itemService: ItemService,
  ) { }

  setPaginationSizes() {
    if (window.innerWidth <= 320) {
      this.maxSize = 1;
      this.pageSize = 9;
    }
    else if (window.innerWidth <= 375) {
      this.maxSize = 3;
      this.pageSize = 9;
    }
    else if (window.innerWidth <= 425) {
      this.maxSize = 5;
      this.pageSize = 9;
    }
    else if (window.innerWidth <= 768) {
      this.maxSize = 5;
      this.pageSize = 8;
    }
    else if (window.innerWidth <= 992) {
      this.maxSize = 10;
      this.pageSize = 8;
    }
    else if (window.innerWidth > 992) {
      this.maxSize = 10;
      this.pageSize = 9;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setPaginationSizes();
  }

  ngOnInit() {
    this.spinnerService.show();

    this.setPaginationSizes();

    this.itemService.query.page = this.page;
    this.itemService.query.pageSize = this.pageSize;

    this.itemService.getWishListItems();
    setInterval(() => {
      this.itemService.getWishListItems();
    }, 3600000);

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
    window.scroll(0,0);
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
