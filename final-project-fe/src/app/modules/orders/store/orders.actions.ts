import { Action } from '@ngrx/store';
import { Bill } from 'src/app/shared/models/bill.model';
import { Booking } from 'src/app/shared/models/booking.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Order } from 'src/app/shared/models/order.model';
import { Table } from 'src/app/shared/models/table.model';

export interface TableParams {
    id;
    table: Table;
}

export interface CreateBillParams {
    tableId;
    bill: Bill;
}

export interface AddOrdersParams {
    tableId;
    orders: Order[];
}

export interface AddCustomerParams {
    id;
    customerId;
    tableId;
}

export const FETCH_TABLES = '[Tables] Fetch All Tables';
export const SET_TABLES = '[Tables] Set Tables';
export const GET_TABLE = '[Tables] Get Table';
export const SET_TABLE = '[Tables] Set Table';
export const CREATE_TABLE = '[Tables] Create Table';
export const UPDATE_TABLE = '[Tables] Update Table';
export const DELETE_TABLE = '[Tables] Delete Table';

export class FetchTables implements Action {
    readonly type = FETCH_TABLES;
}

export class SetTables implements Action {
    readonly type = SET_TABLES;
    constructor(public payload: Table[]) {}
}

export class GetTable implements Action {
    readonly type = GET_TABLE;
    constructor(public payload: number) {}
}

export class SetTable implements Action {
    readonly type = SET_TABLE;
    constructor(public payload: Table) {}
}

export class CreateTable implements Action {
    readonly type = CREATE_TABLE;
    constructor(public payload: TableParams) {}
}

export class UpdateTable implements Action {
    readonly type = UPDATE_TABLE;
    constructor(public payload: TableParams) {}
}

export class DeleteTable implements Action {
    readonly type = DELETE_TABLE;
    constructor(public payload: TableParams) {}
}

export const FETCH_MENU = '[Orders] Fetch Menu';
export const SET_MENU = '[Orders] Set Menu';
export const FETCH_CATEGORIES = '[Orders] Fetch Dish Categories';
export const SET_CATEGORIES = '[Orders] Set Dish Categories';

export class FetchMenu implements Action {
    readonly type = FETCH_MENU;
    constructor(public payload: number) {}
}

export class SetMenu implements Action {
    readonly type = SET_MENU;
    constructor(public payload: Dish[]) {}
}

export class FetchCategories implements Action {
    readonly type = FETCH_CATEGORIES;
}

export class SetCategories implements Action {
    readonly type = SET_CATEGORIES;
    constructor(public payload: DishCategory[]) {}
}

export const GET_BOOKING = '[Bills] Get Booking by TableId';
export const SET_BOOKING = '[Bills] Set Booking';

export class GetBooking implements Action {
    readonly type = GET_BOOKING;
    constructor(public payload: number) {}
}

export class SetBooking implements Action {
    readonly type = SET_BOOKING;
    constructor(public payload: Booking) {}
}

export const GET_BILL = '[Bills] Get Bill by tableId';
export const SET_BILL = '[Bills] Set Bill';
export const CREATE_BILL = '[Bills] Create Bill';
export const ADD_ORDERS = '[Bills] Add Orders to Bill';
export const CHECKOUT_BILL = '[Bills] Checkout Bill by tableId';
export const FETCH_CUSTOMER = '[Bills] Fetch Customer by Name / Phone';
export const SET_CUSTOMER = '[Bills] Set Customer';
export const ADD_CUSTOMER = '[Bills] Add Customer for Bill';

export class GetBill implements Action {
    readonly type = GET_BILL;
    constructor(public payload: number) {}
}

export class SetBill implements Action {
    readonly type = SET_BILL;
    constructor(public payload: Bill) {}
}

export class CreateBill implements Action {
    readonly type = CREATE_BILL;
    constructor(public payload: CreateBillParams) {}
}

export class AddOrders implements Action {
    readonly type = ADD_ORDERS;
    constructor(public payload: AddOrdersParams) {}
}

export class CheckoutBill implements Action {
    readonly type = CHECKOUT_BILL;
    constructor(public payload: number) {}
}

export class FetchCustomer implements Action {
    readonly type = FETCH_CUSTOMER;
    constructor(public payload: string) {}
}

export class SetCustomer implements Action {
    readonly type = SET_CUSTOMER;
    constructor(public payload: Customer) {}
}

export class AddCustomer implements Action {
    readonly type = ADD_CUSTOMER;
    constructor(public payload: AddCustomerParams) {}
}

export type OrdersActions =
    | FetchTables
    | SetTables
    | GetTable
    | SetTable
    | CreateTable
    | UpdateTable
    | DeleteTable
    | FetchMenu
    | SetMenu
    | FetchCategories
    | SetCategories
    | GetBooking
    | SetBooking
    | GetBill
    | SetBill
    | CreateBill
    | AddOrders
    | CheckoutBill
    | FetchCustomer
    | SetCustomer
    | AddCustomer;
