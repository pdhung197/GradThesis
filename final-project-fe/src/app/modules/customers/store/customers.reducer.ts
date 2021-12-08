import { Bill } from 'src/app/shared/models/bill.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import * as CustomersActions from '../store/customers.actions';

export interface State {
    customers: PaginatedResult<Customer[]>;
    bills: Bill[];
}

const initCustomers = new PaginatedResult<Customer[]>();
initCustomers.result = [];
initCustomers.pagination = {
    totalItems: 0
};

export const initialState: State = {
    customers: initCustomers,
    bills: []
};

export function customerReducer(
    state: State = initialState,
    action: CustomersActions.CustomersActions
) {
    switch (action.type) {
        case CustomersActions.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            };
        case CustomersActions.SET_BILLS:
            return {
                ...state,
                bills: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
