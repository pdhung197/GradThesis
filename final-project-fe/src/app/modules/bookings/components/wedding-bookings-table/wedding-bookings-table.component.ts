import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { BookingParams, SearchBookings } from '../../store/bookings.actions';
import { State } from '../../store/bookings.reducer';
import * as fromApp from 'src/app/store/app.reducer';
import * as BookingsActions from '../../store/bookings.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Booking } from 'src/app/shared/models/booking.model';
import { BookingOrdersComponent } from '../booking-orders/booking-orders.component';
import { BookingEditComponent } from '../booking-edit/booking-edit.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-wedding-bookings-table',
  templateUrl: './wedding-bookings-table.component.html',
  styleUrls: ['./wedding-bookings-table.component.scss']
})
export class WeddingBookingsTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchBookings;
  public bookingParams: BookingParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public auth: AuthService) { }

  ngOnInit() {
    this.data$ = this.store.select('bookings');

    this.onPageChanged(1);

    this.searchForm.get('name').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });

    this.searchForm.get('date').valueChanges
      .pipe(
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
  }

  public onPageChanged(page: number): void {
    const name = this.searchForm.get('name').value;
    let date = this.searchForm.get('date').value;
    if (date) {
      date = formatDate(date, 'yyyy-MM-dd', 'en');
    } else {
      date = '';
    }

    this.searchParams = {
      pageNumber: page,
      pageSize: 10,
      name,
      date
    };
    this.store.dispatch(new BookingsActions.FetchWeddingBookings(this.searchParams));
  }

  public openOrdersModal(booking: Booking, params: SearchBookings): void {
    this.bsModalRef = this.modalService.show(BookingOrdersComponent, {
      initialState: {
        booking,
        params
      },
      class: 'modal-lg'
    });
  }

  public openEditModal(booking: Booking, params: SearchBookings): void {
    this.bsModalRef = this.modalService.show(BookingEditComponent, {
      initialState: {
        booking,
        params
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.bookingParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa thông tin đặt tiệc cưới này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new BookingsActions.DeleteBooking(this.bookingParams));
          }
        }
      }
    });
  }

}
