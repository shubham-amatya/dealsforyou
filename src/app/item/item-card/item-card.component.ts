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
    event.target.innerHTML = 'Adding...';
    this.disabled = true; 
    this.itemService.addToWishList(this.item._id)
    .subscribe(res => {
      event.target.innerHTML = 'Added to wishlist';
    }, error => {});
    this.itemService.getWishListItems();
  }
  
  removeFromWishList(event) {
    event.target.innerHTML = 'Removing...';
    this.disabled = true; 
    this.itemService.removeFromWishList(this.item._id)
    .subscribe(res => {
      //this.isInWishList = false;  
    }, error => {});
    this.itemService.getWishListItems();
  }
  
  

}

