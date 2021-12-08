import { ActionReducerMap } from '@ngrx/store';
import * as fromMaterials from '../modules/materials/store/materials.reducer';
import * as fromMenu from '../modules/menu/store/menu.reducer';
import * as fromEmployees from '../modules/employees/store/employees.reducer';
import * as fromCustomers from '../modules/customers/store/customers.reducer';
import * as fromHome from '../modules/home/store/home.reducer';
import * as fromBookings from '../modules/bookings/store/bookings.reducer';
import * as fromOrders from '../modules/orders/store/orders.reducer';
import * as fromPromotions from '../modules/promotions/store/promotions.reducer';
import * as fromReports from '../modules/reports/store/reports.reducer';

export interface AppState {
    home: fromHome.State;
    materials: fromMaterials.State;
    menu: fromMenu.State;
    employees: fromEmployees.State;
    customers: fromCustomers.State;
    bookings: fromBookings.State;
    orders: fromOrders.State;
    promotions: fromPromotions.State;
    reports: fromReports.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    home: fromHome.homeReducer,
    materials: fromMaterials.materialReducer,
    menu: fromMenu.menuReducer,
    employees: fromEmployees.employeeReducer,
    customers: fromCustomers.customerReducer,
    bookings: fromBookings.bookingReducer,
    orders: fromOrders.orderReducer,
    promotions: fromPromotions.promotionReducer,
    reports: fromReports.reportReducer
};
