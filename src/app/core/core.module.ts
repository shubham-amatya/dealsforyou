import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SortFilterComponent } from './sort-filter/sort-filter.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomepageComponent,
    NavbarComponent,
  ],
  declarations: [
    HomepageComponent,
    NavbarComponent,
    PageNotFoundComponent,
    SearchBarComponent,
    SortFilterComponent
  ]
})
export class CoreModule { }
