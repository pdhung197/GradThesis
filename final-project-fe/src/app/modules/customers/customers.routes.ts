import { Routes } from '@angular/router';
import { CustomersManageComponent } from './pages/customers-manage/customers-manage.component';

export const CUSTOMER_ROUTES: Routes = [
    {
        path: '',
        component: CustomersManageComponent
    }
];
