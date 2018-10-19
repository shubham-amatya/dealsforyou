import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";

import { ItemService } from "../item.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() isWishList;
  @Input() item;
  //@Input() pageSize;
  //@Input() page;
  @Input() isInWishList;
  disabled = false;
  IsAuthenticated = false;

  constructor(
    private itemService: ItemService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.IsAuthenticated = this.authService.getIsAuth();
  }
  
  addToWishList(event) {
    this.itemService.addToWishList(this.item._id)
    .subscribe(res => {
      event.target.innerHTML = 'Added to wishlist';
      this.disabled = true;  
    }, error => {});
    this.itemService.getWishListItems();
  }
  
  removeFromWishList() {
    this.itemService.removeFromWishList(this.item._id)
    .subscribe(res => {
      //this.isInWishList = false;  
    }, error => {});
    this.itemService.getWishListItems();
  }
  
  

}

