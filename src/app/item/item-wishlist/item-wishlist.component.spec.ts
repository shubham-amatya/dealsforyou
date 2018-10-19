import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWishlistComponent } from './item-wishlist.component';

describe('ItemWishlistComponent', () => {
  let component: ItemWishlistComponent;
  let fixture: ComponentFixture<ItemWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
