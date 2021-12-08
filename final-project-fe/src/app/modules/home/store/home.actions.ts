import { Action } from '@ngrx/store';
import { Booking } from 'src/app/shared/models/booking.model';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Order } from 'src/app/shared/models/order.model';
import { Promotion } from 'src/app/shared/models/promotion.model';

export interface AddOrdersParams {
    bookingId;
    orders: Order[];
}

export const FETCH_MENU = '[Home] Fetch Menu';
export const SET_MENU = '[Home] Set Menu';
export const FETCH_CATEGORIES = '[Home] Fetch Dish Categories';
export const SET_CATEGORIES = '[Home] Set Dish Categories';
export const CREATE_BOOKING = '[Home] Create Booking';
export const SET_BOOKING = '[Home] Set Booking';
export const ADD_ORDERS = '[Home] Add Orders for Booking';
export const FETCH_PROMOTIONS = '[Home] Fetch All Promotions';
export const SET_PROMOTIONS = '[Home] Set Promotions';

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

export class CreateBooking implements Action {
    readonly type = CREATE_BOOKING;
    constructor(public payload: Booking) {}
}

export class SetBooking implements Action {
    readonly type = SET_BOOKING;
    constructor(public payload: Booking) {}
}

export class AddOrders implements Action {
    readonly type = ADD_ORDERS;
    constructor(public payload: AddOrdersParams) {}
}

export class FetchPromotions implements Action {
    readonly type = FETCH_PROMOTIONS;
}

export class SetPromotions implements Action {
    readonly type = SET_PROMOTIONS;
    constructor(public payload: Promotion[]) {}
}

export type HomeActions =
    | FetchMenu
    | SetMenu
    | FetchCategories
    | SetCategories
    | CreateBooking
    | SetBooking
    | AddOrders
    | FetchPromotions
    | SetPromotions;
