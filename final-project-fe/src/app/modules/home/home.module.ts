import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HOME_ROUTES } from './home.routes';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { DishCategoriesSidebarComponent } from './components/dish-categories-sidebar/dish-categories-sidebar.component';
import { CommonModule } from '@angular/common';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
import { OrdersBookingComponent } from './pages/orders-booking/orders-booking.component';
import { CategoriesSelectComponent } from './components/categories-select/categories-select.component';
import { DishesSelectComponent } from './components/dishes-select/dishes-select.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { OrdersSelectingComponent } from './components/orders-selecting/orders-selecting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePreventUnsavedOrders } from 'src/app/core/guards/home-prevent-unsaved-orders.guard';
import { CoreModule } from 'src/app/core/core.module';
import { PromotionsPageComponent } from './pages/promotions-page/promotions-page.component';
import { PromotionDetailComponent } from './pages/promotion-detail/promotion-detail.component';

@NgModule({
    declarations: [
        HomePageComponent,
        LoginComponent,
        BookingPageComponent,
        MenuPageComponent,
        DishCategoriesSidebarComponent,
        DishesListComponent,
        OrdersBookingComponent,
        CategoriesSelectComponent,
        DishesSelectComponent,
        OrdersSelectingComponent,
        PromotionsPageComponent,
        PromotionDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        ModalModule.forRoot(),

        SharedModule,
        CoreModule,
        RouterModule.forChild(HOME_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef,
        HomePreventUnsavedOrders
    ]
})
export class HomeModule {

}
