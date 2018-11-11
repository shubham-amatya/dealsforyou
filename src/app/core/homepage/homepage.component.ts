import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  userIsAuthenticated = false;
  
  constructor(
    private authService: AuthService  
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
  }

}
