import { Component, OnInit } from '@angular/core';
import * as BookingsActions from '../../store/bookings.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { Booking } from 'src/app/shared/models/booking.model';
import { BookingParams, SearchBookings } from '../../store/bookings.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit {

  public booking: Booking;
  public params: SearchBookings;

  public bookingForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    bookingDate: new FormControl(new Date(), Validators.required),
    bookingTime: new FormControl(new Date(), Validators.required),
    numberOfPeople: new FormControl(0, Validators.required),
    deposit: new FormControl(0),
    status: new FormControl('NotConfirmed', Validators.required),
    note: new FormControl('')
  });

  public minDate = new Date();

  constructor(public bsModalRef: BsModalRef, public store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.booking) {
      this.bookingForm.patchValue({
        ...this.booking,
        bookingDate: new Date(this.booking.bookingTime),
        bookingTime: this.booking.bookingTime
      });
    }
  }

  get f() {
    return this.bookingForm.controls;
  }

  public onSubmit(): void {
    const date = this.bookingForm.get('bookingDate').value;

    const x = new Date(this.bookingForm.get('bookingTime').value);
    // tslint:disable-next-line: max-line-length
    const bookingTime = `${formatDate(date, 'yyyy-MM-dd', 'en')}T${x.getHours() < 10 ? '0' + x.getHours() : x.getHours()}:${x.getMinutes() < 10 ? '0' + x.getMinutes() : x.getMinutes()}:00`;

    const booking: Booking = {
      id: this.booking ? this.booking.id : null,
      customerName: this.f.customerName.value,
      phone: this.f.phone.value,
      bookingTime,
      numberOfPeople: +this.f.numberOfPeople.value,
      deposit: +this.f.deposit.value,
      status: this.f.status.value,
      note: this.f.note.value
    };

    const id = booking.id;

    const bookingParams: BookingParams = {
      id,
      booking,
      params: this.params
    };

    if (this.booking) {
      this.store.dispatch(new BookingsActions.UpdateBooking(bookingParams));
    } else {
      this.store.dispatch(new BookingsActions.CreateBooking(bookingParams));
    }

    this.bsModalRef.hide();
  }

}
