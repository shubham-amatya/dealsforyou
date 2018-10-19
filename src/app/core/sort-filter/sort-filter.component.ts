import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../item/item.service';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss']
})
export class SortFilterComponent implements OnInit {

  constructor(
    private itemService: ItemService  
  ) { }

  ngOnInit() {
  }

  sort(event) {
    const sortBy = event.target.getAttribute('sortBy');
    let orderToSort = ''; 
    if (event.target.value === 'Ascending'){
      orderToSort = '+1';
    }
    if (event.target.value === 'Descending'){
      orderToSort = '-1';
    }
    /*(event.target.value === 'Ascending') ? orderToSort = '+1': false;
    (event.target.value === 'Descending') ? orderToSort = '-1': false;*/
    console.log(event.target.value);
    console.log(orderToSort);
    this.itemService.query[sortBy] = orderToSort;
    if(window.location.pathname === '/promotions') {
      this.itemService.getItems();
    } else if(window.location.pathname === '/wishlist') {
      this.itemService.getWishListItems();
    }
  }
  
  find(event) {
    const findBy = event.target.getAttribute('findBy');
    const valueToFind = event.target.value.toLowerCase();
    console.log(findBy);
    console.log(valueToFind);
    this.itemService.query[findBy] = valueToFind;
    if(window.location.pathname === '/promotions') {
      this.itemService.getItems();
    } else if(window.location.pathname === '/wishlist') {
      this.itemService.getWishListItems();
    }
  }
  
  /*formatCurrency(n, separate = "."){
    var s = n.toString();
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var ret = s.replace(regex, separate);
    return ret;
  }*/
}
