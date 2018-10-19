import { Component, OnInit, OnDestroy } from '@angular/core';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
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
  
  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }
    //this.isLoading = true;
    this.spinnerService.show();
    this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
  
  signupForm = this.fb.group({
    'email': ['', [Validators.required, Validators.email] ],
    'password': ['', [Validators.required, Validators.minLength(6)] ]
  })
  
  /*onSubmit() {
    this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    //console.warn(this.signupForm.value)
    console.warn(this.emailInput.invalid)
    
  }*/
  
  get emailInput() {
    return this.signupForm.get('email');
  }
  
  get passwordInput() {
    return this.signupForm.get('password');
  }

}
