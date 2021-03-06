import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AuthService } from "../../auth/auth.service";
import { ItemService } from "../../item/item.service";
import { defaultQuery } from "../../item/default-query.config";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  
  isListComponent: boolean;
  navbarBackgroundColor: string;
  
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private itemService: ItemService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(
        this.location.path() === '/promotions' ||
        this.location.path() === '/wishlist'
      ) 
      {
        this.isListComponent = true;
        //this.navbarBackgroundColor = '#007bff!important'; 
      } 
      else {
        this.isListComponent = false;
        //this.navbarBackgroundColor = 'white!important'; 
      }
    });
    
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  
  resetSearchParamsToDefault() {
    this.itemService.query = defaultQuery;
    if(window.location.pathname === '/promotions') {
      this.itemService.getItems();
    } else if(window.location.pathname === '/wishlist') {
      this.itemService.getWishListItems();
    }
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
