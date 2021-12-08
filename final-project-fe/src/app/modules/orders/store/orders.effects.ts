import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cibPlayerMe } from '@coreui/icons';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { Bill } from 'src/app/shared/models/bill.model';
import { Booking } from 'src/app/shared/models/booking.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Table } from 'src/app/shared/models/table.model';
import { environment } from 'src/environments/environment';
import * as OrdersActions from '../store/orders.actions';

@Injectable()
export class OrderEffects {
    @Effect()
    fetchTables = this.actions$.pipe(
        ofType(OrdersActions.FETCH_TABLES),
        switchMap((action: OrdersActions.FetchTables) => {
            return this.http.get<Table[]>(`${environment.apiUrl}/tables`)
                .pipe(
                    map((response) => {
                        return new OrdersActions.SetTables(response);
                    })
                );
        })
    );

    @Effect()
    getTable = this.actions$.pipe(
        ofType(OrdersActions.GET_TABLE),
        switchMap((action: OrdersActions.GetTable) => {
            return this.http.get<Table>(`${environment.apiUrl}/tables/${action.payload}`)
                .pipe(
                    map((response) => {
                        return new OrdersActions.SetTable(response);
                    })
                );
        })
    );

    @Effect()
    createTable = this.actions$.pipe(
        ofType(OrdersActions.CREATE_TABLE),
        switchMap((action: OrdersActions.CreateTable) => {
            return this.http.post<Table>(`${environment.apiUrl}/tables`, action.payload.table)
                .pipe(
                    map(() => {
                        return new OrdersActions.FetchTables();
                    })
                );
        })
    );

    @Effect()
    updateTable = this.actions$.pipe(
        ofType(OrdersActions.UPDATE_TABLE),
        switchMap((action: OrdersActions.UpdateTable) => {
            return this.http.put<Table>(`${environment.apiUrl}/tables`, action.payload.table)
                .pipe(
                    map(() => {
                        return new OrdersActions.FetchTables();
                    })
                );
        })
    );

    @Effect()
    deleteTable = this.actions$.pipe(
        ofType(OrdersActions.DELETE_TABLE),
        switchMap((action: OrdersActions.DeleteTable) => {
            return this.http.delete<void>(`${environment.apiUrl}/tables/${action.payload.id}`)
                .pipe(
                    map(() => {
                        return new OrdersActions.FetchTables();
                    })
                );
        })
    );

    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(OrdersActions.FETCH_CATEGORIES),
        switchMap((action: OrdersActions.FetchCategories) => {
            return this.http.get<DishCategory[]>(`${environment.apiUrl}/dish-categories`)
                .pipe(
                    map((response) => {
                        return new OrdersActions.SetCategories(response);
                    })
                );
        })
    );

    @Effect()
    fetchMenu = this.actions$.pipe(
        ofType(OrdersActions.FETCH_MENU),
        switchMap((action: OrdersActions.FetchMenu) => {
            const params = new HttpParams()
                .append(ParamsConstant.categorySearch, action.payload.toString());

            return this.http.get<Dish[]>(`${environment.apiUrl}/dishes/all`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    return new OrdersActions.SetMenu(response.body);
                })
            );
        })
    );

    @Effect()
    getBookingByTableId = this.actions$.pipe(
        ofType(OrdersActions.GET_BOOKING),
        switchMap((action: OrdersActions.GetBooking) => {
            return this.http.get<Booking>(`${environment.apiUrl}/bookings/table/${action.payload}`)
                .pipe(
                    map((response) => {
                        return new OrdersActions.SetBooking(response);
                    })
                );
        })
    );

    @Effect()
    getBillByTableId = this.actions$.pipe(
        ofType(OrdersActions.GET_BILL),
        switchMap((action: OrdersActions.GetBill) => {
            return this.http.get<Bill>(`${environment.apiUrl}/bills/table/${action.payload}`)
                .pipe(
                    map((response) => {
                        return new OrdersActions.SetBill(response);
                    })
                );
        })
    );

    @Effect()
    createBill = this.actions$.pipe(
        ofType(OrdersActions.CREATE_BILL),
        switchMap((action: OrdersActions.CreateBill) => {
            return this.http.post<Bill>(`${environment.apiUrl}/bills`, action.payload.bill)
                .pipe(
                    map(() => {
                        return new OrdersActions.GetBill(action.payload.tableId);
                    }
                )
            );
        })
    );

    @Effect()
    addOrders = this.actions$.pipe(
        ofType(OrdersActions.ADD_ORDERS),
        switchMap((action: OrdersActions.AddOrders) => {
            return this.http.put<void>(`${environment.apiUrl}/bills/${action.payload.tableId}`, action.payload.orders)
                .pipe(
                    map(() => {
                        return new OrdersActions.GetBill(action.payload.tableId);
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    checkoutBill = this.actions$.pipe(
        ofType(OrdersActions.CHECKOUT_BILL),
        switchMap((action: OrdersActions.CheckoutBill) => {
            return this.http.put<void>(`${environment.apiUrl}/bills/checkout/${action.payload}`, {})
                .pipe(
                    tap(() => {
                        this.router.navigate(['quan-ly/goi-mon']);
                    })
                );
        })
    );

    @Effect()
    fetchCustomer = this.actions$.pipe(
        ofType(OrdersActions.FETCH_CUSTOMER),
        switchMap((action: OrdersActions.FetchCustomer) => {
            const paginatedResult: PaginatedResult<Customer[]> = new PaginatedResult<Customer[]>();

            const params = new HttpParams()
                .append(ParamsConstant.nameSearch, action.payload);

            return this.http.get<Customer[]>(`${environment.apiUrl}/customers`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    const result = paginatedResult.result[0] ? paginatedResult.result[0] : null;
                    return new OrdersActions.SetCustomer(result);
                })
            );
        })
    );

    @Effect()
    addCustomer = this.actions$.pipe(
        ofType(OrdersActions.ADD_CUSTOMER),
        switchMap((action: OrdersActions.AddCustomer) => {
            return this.http.put<void>(`${environment.apiUrl}/bills/${action.payload.id}/customer/${action.payload.customerId}`, {})
                .pipe(
                    map(() => {
                        return new OrdersActions.GetBill(action.payload.tableId);
                    })
                );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
