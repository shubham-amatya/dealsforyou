import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private flashMessage: FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    this.flashMessage.show('You are not authorized to do that!', { cssClass: 'alert-danger' });
    return false;
  }
}

