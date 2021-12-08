import { Action } from '@ngrx/store';
import { Bill } from 'src/app/shared/models/bill.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';

export interface SearchCustomers {
    pageNumber;
    pageSize;
    name: string;
}

export interface CustomerParams {
    id;
    customer?: Customer;
    params: SearchCustomers;
}

export const FETCH_CUSTOMERS = '[Customers] Fetch Customers';
export const SET_CUSTOMERS = '[Customers] Set Customers';
export const FETCH_ALL_CUSTOMERS = '[Customers] Fetch All Customers';
export const FETCH_BILLS = '[Customers] Fetch All Bills by Customer';
export const SET_BILLS = '[Customers] Set Bills by Customer';
export const GET_CUSTOMER = '[Customers] Get Customer';
export const CREATE_CUSTOMER = '[Customers] Create Customer';
export const UPDATE_CUSTOMER = '[Customers] Update Customer';
export const DELETE_CUSTOMER = '[Customers] Delete Customer';

export class FetchCustomers implements Action {
    readonly type = FETCH_CUSTOMERS;
    constructor(public payload: SearchCustomers) {}
}

export class SetCustomers implements Action {
    readonly type = SET_CUSTOMERS;
    constructor(public payload: PaginatedResult<Customer[]>) {}
}

export class FetchAllCustomers implements Action {
    readonly type = FETCH_ALL_CUSTOMERS;
}

export class FetchBills implements Action {
    readonly type = FETCH_BILLS;
    constructor(public payload: number) {}
}

export class SetBills implements Action {
    readonly type = SET_BILLS;
    constructor(public payload: Bill[]) {}
}

export class GetCustomer implements Action {
    readonly type = GET_CUSTOMER;
    constructor(public payload: number) {}
}

export class CreateCustomer implements Action {
    readonly type = CREATE_CUSTOMER;
    constructor(public payload: CustomerParams) {}
}

export class UpdateCustomer implements Action {
    readonly type = UPDATE_CUSTOMER;
    constructor(public payload: CustomerParams) {}
}

export class DeleteCustomer implements Action {
    readonly type = DELETE_CUSTOMER;
    constructor(public payload: CustomerParams) {}
}

export type CustomersActions =
    | FetchCustomers
    | SetCustomers
    | FetchAllCustomers
    | FetchBills
    | SetBills
    | GetCustomer
    | CreateCustomer
    | UpdateCustomer
    | DeleteCustomer;
