import {
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent  
} from "@angular/common/http";
import { catchError,tap} from 'rxjs/operators';
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _flashMessagesService: FlashMessagesService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
	    .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            let message = 'Resquest handled successfully!';
            let messageType = 'alert-success';
            if (event.body.message && event.body.messageType) {
              message = event.body.message;
              messageType = event.body.messageType;
            }
            return this._flashMessagesService.show(message, { cssClass: messageType });
          }
        }, error => {
          	let errorMessage = "An unknown error occurred!";
            if (error.error.message) {
              errorMessage = error.error.message;
            }
            this._flashMessagesService.show(errorMessage, { cssClass: 'alert-danger' });
            return throwError(error);
  
        })
      )
  }    
}
