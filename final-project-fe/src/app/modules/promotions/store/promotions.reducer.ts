import { Customer } from 'src/app/shared/models/customer.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Promotion } from 'src/app/shared/models/promotion.model';
import * as PromotionsActions from '../store/promotions.actions';

export interface State {
    promotions: PaginatedResult<Promotion[]>;
    promotion: Promotion;
    dishes: Dish[];
    customers: Customer[];
}

const initPromotions = new PaginatedResult<Promotion[]>();
initPromotions.result = [];
initPromotions.pagination = {
    totalItems: 0
};

export const initialState: State = {
    promotions: initPromotions,
    promotion: {},
    dishes: [],
    customers: []
};

export function promotionReducer(
    state: State = initialState,
    action: PromotionsActions.PromotionsActions
) {
    switch (action.type) {
        case PromotionsActions.SET_PROMOTIONS:
            return {
                ...state,
                promotions: action.payload
            };
        case PromotionsActions.SET_PROMOTION:
            return {
                ...state,
                promotion: action.payload
            };
        case PromotionsActions.SET_DISHES:
            return {
                ...state,
                dishes: action.payload
            };
        case PromotionsActions.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
