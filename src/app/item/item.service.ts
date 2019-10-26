import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";
import { Item } from "./item.model";
import { defaultQuery } from "./default-query.config";
import { AuthService } from "../auth/auth.service";

const serverUrl = environment.apiUrl + "/item";

@Injectable({ providedIn: 'root' })
export class ItemService {
  query = defaultQuery;

  private items: Item[] = [];
  private newItems = new Subject<{ items: Item[]; collectionSize: number }>();

  private wishlist: Item[] = [];
  private newWishList = new Subject<{ wishlist: Item[]; collectionSize: number }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  getItems() {
    const queryParams = `?pagesize=${this.query.pageSize}&page=${this.query.page}&sortbyprice=${this.query.sortByPrice}&sortbydiscount=${this.query.sortByDiscount}&findbywebsite=${this.query.findByWebsite}&findbycategory=${this.query.findByCategory}&findbytitle=${this.query.findByTitle}`;
    this.http.get<{message: string, messageType: string, items: Item[], collectionSize: number}>
    (serverUrl + queryParams)
    .pipe(
        map(data => {
          return {
            items: data.items.map(item => { return{...item}; }),
            collectionSize: data.collectionSize
          };
        })
      )
      .subscribe(newData => {
        this.items = newData.items;
        this.newItems.next({
          items: [...this.items],
          collectionSize: newData.collectionSize
        });
      });
  }

  getItemsListener() {
    return this.newItems.asObservable();
  }

  getWishListListener() {
    return this.newWishList.asObservable();
  }

  getWishListItems() {
    const userId = this.authService.getUserId();
    const queryParams = `?pagesize=${this.query.pageSize}&page=${this.query.page}&sortbyprice=${this.query.sortByPrice}&sortbydiscount=${this.query.sortByDiscount}&findbywebsite=${this.query.findByWebsite}&findbycategory=${this.query.findByCategory}&findbytitle=${this.query.findByTitle}`;
    this.http.get<{
      message: string,
      messageType: string,
      wishlist: Item[],
      collectionSize: number

    }>
    (`${serverUrl}/${userId}/wishlist${queryParams}`)
    .pipe(
        map(data => {
          return {
            wishlist: data.wishlist.map(item => { return{...item}; }),
            collectionSize: data.collectionSize
          };
        })
      )
      .subscribe(newData => {
        this.wishlist = newData.wishlist;
        this.newWishList.next({
          wishlist: [...this.wishlist],
          collectionSize: newData.collectionSize
        });
      });
  }

  addToWishList(itemId: string) {
    const userId = this.authService.getUserId();
    return this.http.put(`${serverUrl}/${userId}/wishlist/${itemId}`, {});
  }

  removeFromWishList(itemId: string){
    const userId = this.authService.getUserId();
    return this.http.delete(`${serverUrl}/${userId}/wishlist/${itemId}`);
  }
}


