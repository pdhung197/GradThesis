import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { Booking } from 'src/app/shared/models/booking.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Table } from 'src/app/shared/models/table.model';
import { environment } from 'src/environments/environment';
import * as BookingsActions from '../store/bookings.actions';

@Injectable()
export class BookingEffects {
    @Effect()
    fetchBookings = this.actions$.pipe(
        ofType(BookingsActions.FETCH_BOOKINGS),
        switchMap((action: BookingsActions.FetchBookings) => {
            const paginatedResult: PaginatedResult<Booking[]> = new PaginatedResult<Booking[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name)
                .append(ParamsConstant.dateSearch, action.payload.date);

            return this.http.get<Booking[]>(`${environment.apiUrl}/bookings`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new BookingsActions.SetBookings(paginatedResult);
                })
            );
        })
    );

    @Effect()
    fetchWeddingBookings = this.actions$.pipe(
        ofType(BookingsActions.FETCH_WEDDING_BOOKINGS),
        switchMap((action: BookingsActions.FetchWeddingBookings) => {
            const paginatedResult: PaginatedResult<Booking[]> = new PaginatedResult<Booking[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name)
                .append(ParamsConstant.dateSearch, action.payload.date);

            return this.http.get<Booking[]>(`${environment.apiUrl}/bookings/wedding`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new BookingsActions.SetBookings(paginatedResult);
                })
            );
        })
    );

    @Effect()
    createBooking = this.actions$.pipe(
        ofType(BookingsActions.CREATE_BOOKING),
        switchMap((action: BookingsActions.CreateBooking) => {
            return this.http.post<Booking>(`${environment.apiUrl}/bookings`, action.payload.booking)
                .pipe(
                    map(() => {
                        return new BookingsActions.FetchBookings(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateBooking = this.actions$.pipe(
        ofType(BookingsActions.UPDATE_BOOKING),
        switchMap((action: BookingsActions.UpdateBooking) => {
            return this.http.put<Booking>(`${environment.apiUrl}/bookings`, action.payload.booking)
                .pipe(
                    map(() => {
                        return new BookingsActions.FetchBookings(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteBooking = this.actions$.pipe(
        ofType(BookingsActions.DELETE_BOOKING),
        switchMap((action: BookingsActions.DeleteBooking) => {
            return this.http.delete<void>(`${environment.apiUrl}/bookings/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new BookingsActions.FetchBookings(action.payload.params);
                })
            );
        })
    );

    @Effect()
    fetchTables = this.actions$.pipe(
        ofType(BookingsActions.FETCH_TABLES),
        switchMap((action: BookingsActions.FetchTables) => {
            return this.http.get<Table[]>(`${environment.apiUrl}/bookings/tables/${action.payload}`)
                .pipe(
                    map((response) => {
                        return new BookingsActions.SetTables(response);
                })
            );
        })
    );

    @Effect()
    assignTable = this.actions$.pipe(
        ofType(BookingsActions.ASSIGN_TABLE),
        switchMap((action: BookingsActions.AssignTable) => {
            return this.http.put<void>(`${environment.apiUrl}/bookings/${action.payload.bookingId}/table/${action.payload.tableId}`, {})
                .pipe(
                    map(() => {
                        return new BookingsActions.FetchBookings(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    fetchAllDishes = this.actions$.pipe(
        ofType(BookingsActions.FETCH_DISHES),
        switchMap((action: BookingsActions.FetchAllDishes) => {
            return this.http.get<Dish[]>(`${environment.apiUrl}/dishes/all`)
                .pipe(
                    map((response) => {
                        return new BookingsActions.SetDishes(response);
                    })
                );
        })
    );

    @Effect()
    updateOrders = this.actions$.pipe(
        ofType(BookingsActions.UPDATE_ORDERS),
        switchMap((action: BookingsActions.UpdateOrders) => {
            return this.http.put<void>(`${environment.apiUrl}/bookings/${action.payload.bookingId}/orders`, action.payload.orders)
                .pipe(
                    map(() => {
                        return new BookingsActions.FetchBookings(action.payload.params);
                    })
                );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
