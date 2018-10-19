import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from "../../auth/auth.service";
import { ItemService } from "../../item/item.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log('navbar', isAuthenticated);
      });
  }
  
  resetSearchParamsToDefault() {
    this.itemService.query = {
      pageSize: 10,
      page: 1,
      findByTitle: '',
      findByWebsite: '',
      findByCategory: '',
      sortByPrice: '',
      sortByDiscount: '' 
    };
    if(window.location.pathname === '/promotions') {
      this.itemService.getItems();
    } else if(window.location.pathname === '/wishlist') {
      this.itemService.getWishListItems();
    }
    //this.itemService.getItems();
  }

  onLogout() {
    this.authService.logout();
    this._flashMessagesService.show('Logged out successfully!', { cssClass: 'alert-success', timeout: 1000 });
  }

  ngOnDestroy() {
    if(this.authListenerSubs) {
      this.authListenerSubs.unsubscribe();
    }
  }

}
