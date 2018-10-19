import { Component, OnInit } from '@angular/core';
//import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  userIsAuthenticated = false;

  //constructor(private _flashMessagesService: FlashMessagesService) { }
  
  constructor(
    private authService: AuthService  
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    //this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
  }

}
