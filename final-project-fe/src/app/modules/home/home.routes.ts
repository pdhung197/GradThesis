import { Routes } from '@angular/router';
import { BookingOrdersGuard } from 'src/app/core/guards/booking-orders.guard';
import { HomePreventUnsavedOrders } from 'src/app/core/guards/home-prevent-unsaved-orders.guard';
import { Error401PageComponent } from 'src/app/shared/components/error-401-page/error-401-page.component';
import { Error500PageComponent } from 'src/app/shared/components/error-500-page/error-500-page.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { OrdersBookingComponent } from './pages/orders-booking/orders-booking.component';
import { PromotionDetailComponent } from './pages/promotion-detail/promotion-detail.component';
import { PromotionsPageComponent } from './pages/promotions-page/promotions-page.component';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'loi-401',
        component: Error401PageComponent
    },
    {
        path: 'loi-500',
        component: Error500PageComponent
    },
    {
        path: 'dang-nhap',
        component: LoginComponent
    },
    {
        path: 'dat-ban',
        component: BookingPageComponent
    },
    {
        path: 'dat-ban/dat-mon',
        component: OrdersBookingComponent,
        canActivate: [BookingOrdersGuard],
        canDeactivate: [HomePreventUnsavedOrders]
    },
    {
        path: 'thuc-don',
        component: MenuPageComponent,
        children: [
            {
                path: ':id',
                component: DishesListComponent
            }
        ]
    },
    {
        path: 'uu-dai',
        component: PromotionsPageComponent,
    },
    {
        path: 'uu-dai/:id',
        component: PromotionDetailComponent
    }
];
