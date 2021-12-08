import { Booking } from 'src/app/shared/models/booking.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Table } from 'src/app/shared/models/table.model';
import * as BookingsActions from '../store/bookings.actions';

export interface State {
    bookings: PaginatedResult<Booking[]>;
    tables: Table[];
    dishes: Dish[];
}

const initBookings = new PaginatedResult<Booking[]>();
initBookings.result = [];
initBookings.pagination = {
    totalItems: 0
};

export const initialState: State = {
    bookings: initBookings,
    tables: [],
    dishes: []
};

export function bookingReducer(
    state: State = initialState,
    action: BookingsActions.BookingsActions
) {
    switch (action.type) {
        case BookingsActions.SET_BOOKINGS:
            return {
                ...state,
                bookings: action.payload
            };
        case BookingsActions.SET_TABLES:
            return {
                ...state,
                tables: action.payload
            };
        case BookingsActions.SET_DISHES:
            return {
                ...state,
                dishes: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
