import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "changepassword", component: ChangePasswordComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthRoutingModule { }
