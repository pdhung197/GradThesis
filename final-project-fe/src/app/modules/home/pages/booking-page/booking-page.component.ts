import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Booking } from 'src/app/shared/models/booking.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as HomeActions from '../../store/home.actions';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  public bookingForm = new FormGroup({
    customerName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    email: new FormControl('', Validators.email),
    forWedding: new FormControl(false),
    bookingDate: new FormControl(new Date(), Validators.required),
    bookingTime: new FormControl(new Date(), Validators.required),
    numberOfPeople: new FormControl(1, [Validators.required, Validators.min(1)]),
    note: new FormControl('')
  });

  public minDate = new Date();

  constructor(public store: Store<fromApp.AppState>) { }

  ngOnInit() {
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
      customerName: this.f.customerName.value,
      phone: this.f.phone.value,
      email: this.f.email.value,
      bookingTime,
      numberOfPeople: +this.f.numberOfPeople.value,
      note: this.f.note.value,
      forWedding: this.f.forWedding.value as boolean
    };

    this.store.dispatch(new HomeActions.CreateBooking(booking));
  }

}
