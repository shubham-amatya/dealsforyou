import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from './error-interceptor';
import { ItemModule } from './item/item.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    CoreModule,
    ItemModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
