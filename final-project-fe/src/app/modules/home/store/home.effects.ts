import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { OrdersSelectService } from 'src/app/core/services/orders-select.service';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { Booking } from 'src/app/shared/models/booking.model';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Promotion } from 'src/app/shared/models/promotion.model';
import { environment } from 'src/environments/environment';
import * as HomeActions from '../store/home.actions';

@Injectable()
export class HomeEffects {
    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(HomeActions.FETCH_CATEGORIES),
        switchMap((action: HomeActions.FetchCategories) => {
            return this.http.get<DishCategory[]>(`${environment.apiUrl}/dish-categories`)
                .pipe(
                    map((response) => {
                        return new HomeActions.SetCategories(response);
                    })
                );
        })
    );

    @Effect()
    fetchMenu = this.actions$.pipe(
        ofType(HomeActions.FETCH_MENU),
        switchMap((action: HomeActions.FetchMenu) => {
            const params = new HttpParams()
                .append(ParamsConstant.categorySearch, action.payload.toString());

            return this.http.get<Dish[]>(`${environment.apiUrl}/dishes/all`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    return new HomeActions.SetMenu(response.body);
                })
            );
        })
    );

    @Effect()
    createBooking = this.actions$.pipe(
        ofType(HomeActions.CREATE_BOOKING),
        switchMap((action: HomeActions.CreateBooking) => {
            return this.http.post<Booking>(`${environment.apiUrl}/bookings`, action.payload)
                .pipe(
                    map((response) => {
                        this.router.navigate(['/dat-ban/dat-mon']);
                        this.alertify.success('Đơn đặt bàn của bạn đã được ghi lại');
                        return new HomeActions.SetBooking(response);
                    })
                );
        })
    );

    @Effect()
    addOrders = this.actions$.pipe(
        ofType(HomeActions.ADD_ORDERS),
        switchMap((action: HomeActions.AddOrders) => {
            return this.http.post<void>(`${environment.apiUrl}/bookings/${action.payload.bookingId}/orders`, action.payload.orders)
                .pipe(
                    map(() => {
                        this.router.navigate(['/']);
                        return new HomeActions.SetBooking({});
                    })
                );
        })
    );

    @Effect()
    fetchPromotions = this.actions$.pipe(
        ofType(HomeActions.FETCH_PROMOTIONS),
        switchMap((action: HomeActions.SetPromotions) => {
            return this.http.get<Promotion[]>(`${environment.apiUrl}/promotions/all`)
                .pipe(
                    map((response) => {
                        const promos = response.filter(p => p.confirmed === true);
                        return new HomeActions.SetPromotions(promos);
                    })
                );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private alertify: AlertifyService) {}
}
