import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


import { AuthService } from "../auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  isLoading =false;
  private authStatusSub: Subscription;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private fb: FormBuilder,
    public authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.hide();
    //this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
        this.spinnerService.hide();
      }
    );      
  }
  
  onChangePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.spinnerService.show();
    this.authService.changePassword(this.changePasswordForm.value.password);
    this.spinnerService.hide();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
  
  changePasswordForm = this.fb.group({
    'password': ['', [Validators.required, Validators.minLength(6)] ]
  })
  
  /*onSubmit() {
    this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    //console.warn(this.signupForm.value)
    console.warn(this.passwordInput.invalid)
    
  }*/
  
  get passwordInput() {
    return this.changePasswordForm.get('password');
  }

}
