import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';

import { Item } from "../item.model";
import { ItemService } from "../item.service";
import { AuthService } from "../../auth/auth.service";
import { defaultPagination } from "../default-pagination.config";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {  
  isWishList = false;
  
  items: Item[] = [];
  
  collectionSize = defaultPagination.collectionSize;
  maxSize = defaultPagination.maxSize;
  pageSize = defaultPagination.pageSize;
  page = defaultPagination.page;
  rotate = defaultPagination.rotate;
  boundaryLinks = defaultPagination.boundaryLinks;

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
  
  private itemsSub: Subscription;
  
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private itemService: ItemService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
  
    this.setPaginationSizes();
    
    this.itemService.query.page = this.page;      
    this.itemService.query.pageSize = this.pageSize;
    
    this.itemService.getItems();
    setInterval(() => {
      this.itemService.getItems();
    }, 3600000);
    
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
    window.scroll(0,0);
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