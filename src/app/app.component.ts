import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'promotion-collector';
    
  constructor(
    private flashMessage: FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService
  ) { }
  
  
 
  ngOnInit() { 
    this.authService.autoAuthUser();
  }
  
  
 
 
}
