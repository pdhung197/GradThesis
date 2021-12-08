import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Booking } from 'src/app/shared/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingOrdersGuard implements CanActivate {
    private booking: Booking;

    constructor(private store: Store<fromApp.AppState>, private router: Router, private alertify: AlertifyService) { }
    canActivate(): boolean {
        this.store.select('home').subscribe((data) => {
            this.booking = data.booking;
        });

        if (this.booking) {
            return true;
        }

        this.alertify.error('Bạn không có quyền truy cập trang này');
        this.router.navigate(['/dat-ban']);
        return false;
    }

}
