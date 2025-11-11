import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPackageComponent } from './booking-package.component';

describe('BookingPackageComponent', () => {
  let component: BookingPackageComponent;
  let fixture: ComponentFixture<BookingPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
