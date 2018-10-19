import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ItemService } from '../../item/item.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  
  constructor(
    private itemService: ItemService,
    private fb: FormBuilder,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() { }
  
  searchForm = this.fb.group({
    search: ['', [Validators.minLength(3), Validators.required]]
  })
  
  sort(event) {
    const sortBy = event.target.getAttribute('sortBy');
    const orderToSort = (event.target.value === 'Descending') ? '-1' : '+1';
    console.log(event.target);
    this.itemService.query[sortBy] = orderToSort;
    this.itemService.getItems();
  }
  
  find(event) {
    const findBy = event.target.getAttribute('findBy');
    const valueToFind = event.target.value.toLowerCase();
    console.log(findBy);
    console.log(valueToFind);
    this.itemService.query[findBy] = valueToFind;
    this.itemService.getItems();
  }
  
  get searchInput() {
    return this.searchForm.get('search');
  }
  
  onChange() {
    if(this.searchInput.invalid && (this.searchInput.dirty || this.searchInput.touched)){
      if(this.searchInput.errors.required){
        this.flashMessagesService.show('The search term is required.', { cssClass: 'alert-success', timeout: 3000 });
      } 
      /*if(this.searchInput.errors.minlength){
        this.flashMessagesService.show('The search term must be at least 3 characters long.', { cssClass: 'alert-success', timeout: 3000 });
      } */
    }
  }
  
  onSubmit() {
    //this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    //console.warn(this.signupForm.value)
    //console.warn(this.searchInput.invalid)
    //const findBy = event.target.getAttribute('findBy');
    //const valueToFind = event.target.value.toLowerCase();
    /*console.log(findBy);
    console.log(valueToFind);*/
    const findBy = 'findByTitle';
    //const valueToFind = this.searchForm.value.search;
    //this.itemService.query[findBy] = valueToFind;
    this.itemService.query = {
          pageSize: 10,
          page: 1,
          findByTitle: this.searchForm.value.search,
          findByWebsite: '',
          findByCategory: '',
          sortByPrice: '',
          sortByDiscount: ''    
    };
    if(window.location.pathname === '/promotions') {
      this.itemService.getItems();
      //console.log(findBy);
      //console.log(valueToFind);
    } else if(window.location.pathname === '/wishlist') {
      this.itemService.getWishListItems();
      //console.log(findBy);
      //console.log(valueToFind);
    }
    //this.searchForm.value.search='';
    
  }

  search(event) {
    
  }
}
