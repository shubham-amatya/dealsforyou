import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from "./item/item-list/item-list.component";
import { ItemWishlistComponent } from "./item/item-wishlist/item-wishlist.component";
import { HomepageComponent } from './core/homepage/homepage.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "promotions", component: ItemListComponent },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule"},
  { path: "wishlist", component: ItemWishlistComponent, canActivate: [AuthGuard]},
  { path: "", component: HomepageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
