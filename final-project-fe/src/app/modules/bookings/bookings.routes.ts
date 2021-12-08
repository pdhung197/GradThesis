import { Routes } from '@angular/router';
import { BookingsManageComponent } from './pages/bookings-manage/bookings-manage.component';
import { WeddingBookingsManageComponent } from './pages/wedding-bookings-manage/wedding-bookings-manage.component';

export const BOOKINGS_ROUTES: Routes = [
    {
        path: '',
        component: BookingsManageComponent
    },
    {
        path: 'dat-tiec-cuoi',
        component: WeddingBookingsManageComponent
    }
];
