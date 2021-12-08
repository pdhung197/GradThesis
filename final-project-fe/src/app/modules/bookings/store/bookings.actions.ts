import { Action } from '@ngrx/store';
import { Booking } from 'src/app/shared/models/booking.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Order } from 'src/app/shared/models/order.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Table } from 'src/app/shared/models/table.model';

export interface SearchBookings {
    pageNumber;
    pageSize;
    name: string;
    date: string;
}

export interface BookingParams {
    id;
    booking?: Booking;
    params: SearchBookings;
}

export interface AssignTableParams {
    bookingId;
    tableId;
    params: SearchBookings;
}

export interface UpdateOrdersParams {
    bookingId;
    orders: Order[];
    params: SearchBookings;
}

export const FETCH_BOOKINGS = '[Bookings] Fetch Bookings';
export const FETCH_WEDDING_BOOKINGS = '[Bookings] Fetch Wedding Bookings';
export const SET_BOOKINGS = '[Bookings] Set Bookings';
export const GET_BOOKING = '[Bookings] Get Booking';
export const CREATE_BOOKING = '[Bookings] Create Booking';
export const UPDATE_BOOKING = '[Bookings] Update Booking';
export const DELETE_BOOKING = '[Bookings] Delete Booking';

export class FetchBookings implements Action {
    readonly type = FETCH_BOOKINGS;
    constructor(public payload: SearchBookings) {}
}

export class FetchWeddingBookings implements Action {
    readonly type = FETCH_WEDDING_BOOKINGS;
    constructor(public payload: SearchBookings) {}
}

export class SetBookings implements Action {
    readonly type = SET_BOOKINGS;
    constructor(public payload: PaginatedResult<Booking[]>) {}
}

export class GetBooking implements Action {
    readonly type = GET_BOOKING;
    constructor(public payload: number) {}
}

export class CreateBooking implements Action {
    readonly type = CREATE_BOOKING;
    constructor(public payload: BookingParams) {}
}

export class UpdateBooking implements Action {
    readonly type = UPDATE_BOOKING;
    constructor(public payload: BookingParams) {}
}

export class DeleteBooking implements Action {
    readonly type = DELETE_BOOKING;
    constructor(public payload: BookingParams) {}
}

export const FETCH_TABLES = '[Tables] Fetch Tables';
export const SET_TABLES = '[Tables] Set Tables';
export const ASSIGN_TABLE = '[Tables] Assign Table';

export class FetchTables implements Action {
    readonly type = FETCH_TABLES;
    constructor(public payload: number) {}
}

export class SetTables implements Action {
    readonly type = SET_TABLES;
    constructor(public payload: Table[]) {}
}

export class AssignTable implements Action {
    readonly type = ASSIGN_TABLE;
    constructor(public payload: AssignTableParams) {}
}

export const FETCH_DISHES = '[Orders] Fetch All Dishes';
export const SET_DISHES = '[Orders] Set Dishes';
export const UPDATE_ORDERS = '[Orders] Update Orders';

export class FetchAllDishes implements Action {
    readonly type = FETCH_DISHES;
}

export class SetDishes implements Action {
    readonly type = SET_DISHES;
    constructor(public payload: Dish[]) {}
}

export class UpdateOrders implements Action {
    readonly type = UPDATE_ORDERS;
    constructor(public payload: UpdateOrdersParams) {}
}

export type BookingsActions =
    | FetchBookings
    | FetchWeddingBookings
    | SetBookings
    | GetBooking
    | CreateBooking
    | UpdateBooking
    | DeleteBooking
    | FetchTables
    | SetTables
    | AssignTable
    | FetchAllDishes
    | SetDishes
    | UpdateOrders;
