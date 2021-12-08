import * as MenuActions from './menu.actions';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Dish } from 'src/app/shared/models/dish.model';

export interface State {
    categories: DishCategory[];
    dishes: PaginatedResult<Dish[]>;
    dish: Dish;
}

const initDishes = new PaginatedResult<Dish[]>();
initDishes.result = [];
initDishes.pagination = {
    totalItems: 0
};

export const initialState: State = {
    categories: [],
    dishes: initDishes,
    dish: {}
};

export function menuReducer(
    state: State = initialState,
    action: MenuActions.MenuActions
) {
    switch (action.type) {
        case MenuActions.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case MenuActions.SET_DISHES:
            return {
                ...state,
                dishes: action.payload
            };
        case MenuActions.SET_DISH:
            return {
                ...state,
                dish: action.payload
            };
        default:
            return state;
    }
}
