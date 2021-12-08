import { Routes } from '@angular/router';
import { PreventUnsavedOrders } from 'src/app/core/guards/prevent-unsaved-orders.guard';
import { CheckoutBookingComponent } from './pages/checkout-booking/checkout-booking.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TableOrdersComponent } from './pages/table-orders/table-orders.component';
import { TablesManageComponent } from './pages/tables-manage/tables-manage.component';

export const ORDERS_ROUTES: Routes = [
    {
        path: '',
        component: TablesManageComponent
    },
    {
        path: 'thanh-toan/:id',
        component: CheckoutComponent
    },
    {
        path: 'dat-ban/:id',
        component: CheckoutBookingComponent
    },
    {
        path: ':id',
        component: TableOrdersComponent,
        canDeactivate: [PreventUnsavedOrders]
    }
];
