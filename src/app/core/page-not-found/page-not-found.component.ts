import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  userIsAuthenticated = false;

  constructor(
    private authService: AuthService    
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
  }

}
