import { Bill } from 'src/app/shared/models/bill.model';
import { Booking } from 'src/app/shared/models/booking.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Table } from 'src/app/shared/models/table.model';
import * as OrdersActions from '../store/orders.actions';

export interface State {
    tables: Table[];
    table: Table;
    menu: Dish[];
    categories: DishCategory[];
    bill: Bill;
    customer: Customer;
    booking: Booking;
}

export const initialState: State = {
    tables: [],
    table: {},
    menu: [],
    categories: [],
    bill: {},
    customer: null,
    booking: {}
};

export function orderReducer(
    state: State = initialState,
    action: OrdersActions.OrdersActions
) {
    switch (action.type) {
        case OrdersActions.SET_TABLES:
            return {
                ...state,
                tables: action.payload
            };
        case OrdersActions.SET_TABLE:
            return {
                ...state,
                table: action.payload
            };
        case OrdersActions.SET_MENU:
            return {
                ...state,
                menu: action.payload
            };
        case OrdersActions.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case OrdersActions.SET_BILL:
            return {
                ...state,
                bill: action.payload
            };
        case OrdersActions.SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            };
        case OrdersActions.SET_BOOKING:
            return {
                ...state,
                booking: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
