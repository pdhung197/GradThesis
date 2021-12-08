import { Booking } from 'src/app/shared/models/booking.model';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Promotion } from 'src/app/shared/models/promotion.model';
import * as HomeActions from '../store/home.actions';

export interface State {
    menu: Dish[];
    categories: DishCategory[];
    booking: Booking;
    promotions: Promotion[];
}

export const initialState: State = {
    menu: [],
    categories: [],
    booking: {},
    promotions: []
};

export function homeReducer(
    state: State = initialState,
    action: HomeActions.HomeActions
) {
    switch (action.type) {
        case HomeActions.SET_MENU:
            return {
                ...state,
                menu: action.payload
            };
        case HomeActions.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case HomeActions.SET_BOOKING:
            return {
                ...state,
                booking: action.payload
            };
        case HomeActions.SET_PROMOTIONS:
            return {
                ...state,
                promotions: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
