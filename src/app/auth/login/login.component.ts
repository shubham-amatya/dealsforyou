import { Component, OnInit, OnDestroy } from '@angular/core';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  //isLoading =false;
  private authStatusSub: Subscription;

  constructor(
    //private _flashMessagesService: FlashMessagesService,
    private fb: FormBuilder,
    public authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.hide();
    //this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        //this.isLoading = false;
        this.spinnerService.hide();
      }
    );      
  }
  
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    //this.isLoading = true;
    this.spinnerService.show();
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
  
  loginForm = this.fb.group({
    'email': ['', [Validators.required, Validators.email] ],
    'password': ['', [Validators.required, Validators.minLength(6)] ]
  })
  
  /*onSubmit() {
    this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    //console.warn(this.signupForm.value)
    console.warn(this.emailInput.invalid)
    
  }*/
  
  get emailInput() {
    return this.loginForm.get('email');
  }
  
  get passwordInput() {
    return this.loginForm.get('password');
  }

}
