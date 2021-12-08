import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { Bill } from 'src/app/shared/models/bill.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { environment } from 'src/environments/environment';
import * as CustomersActions from '../store/customers.actions';

@Injectable()
export class CustomerEffects {
    @Effect()
    fetchCustomers = this.actions$.pipe(
        ofType(CustomersActions.FETCH_CUSTOMERS),
        switchMap((action: CustomersActions.FetchCustomers) => {
            const paginatedResult: PaginatedResult<Customer[]> = new PaginatedResult<Customer[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name);

            return this.http.get<Customer[]>(`${environment.apiUrl}/customers`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new CustomersActions.SetCustomers(paginatedResult);
                })
            );
        })
    );

    @Effect()
    fetchBills = this.actions$.pipe(
        ofType(CustomersActions.FETCH_BILLS),
        switchMap((action: CustomersActions.FetchBills) => {
            return this.http.get<Bill[]>(`${environment.apiUrl}/customers/${action.payload}/bills`)
                .pipe(
                    map((response) => {
                        return new CustomersActions.SetBills(response);
                    })
                );
        })
    );

    @Effect()
    createCustomer = this.actions$.pipe(
        ofType(CustomersActions.CREATE_CUSTOMER),
        switchMap((action: CustomersActions.CreateCustomer) => {
            return this.http.post<Customer>(`${environment.apiUrl}/customers`, action.payload.customer)
                .pipe(
                    map(() => {
                        return new CustomersActions.FetchCustomers(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateCustomer = this.actions$.pipe(
        ofType(CustomersActions.UPDATE_CUSTOMER),
        switchMap((action: CustomersActions.UpdateCustomer) => {
            return this.http.put<Customer>(`${environment.apiUrl}/customers`, action.payload.customer)
                .pipe(
                    map(() => {
                        return new CustomersActions.FetchCustomers(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteCustomer = this.actions$.pipe(
        ofType(CustomersActions.DELETE_CUSTOMER),
        switchMap((action: CustomersActions.DeleteCustomer) => {
            return this.http.delete<void>(`${environment.apiUrl}/customers/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new CustomersActions.FetchCustomers(action.payload.params);
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
