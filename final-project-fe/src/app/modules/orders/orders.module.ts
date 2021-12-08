import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableEditComponent } from './components/table-edit/table-edit.component';
import { ORDERS_ROUTES } from './orders.routes';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TableOrdersComponent } from './pages/table-orders/table-orders.component';
import { TablesManageComponent } from './pages/tables-manage/tables-manage.component';
import { CheckoutTableComponent } from './components/checkout-table/checkout-table.component';
import { CategoriesSelectComponent } from './components/categories-select/categories-select.component';
import { DishesSelectComponent } from './components/dishes-select/dishes-select.component';
import { DishesHistoryComponent } from './components/dishes-history/dishes-history.component';
import { DishesSelectingComponent } from './components/dishes-selecting/dishes-selecting.component';
import { CoreModule } from 'src/app/core/core.module';
import { PreventUnsavedOrders } from 'src/app/core/guards/prevent-unsaved-orders.guard';
import { CheckoutBookingComponent } from './pages/checkout-booking/checkout-booking.component';

@NgModule({
    declarations: [
        TablesManageComponent,
        TableOrdersComponent,
        CheckoutComponent,
        TableEditComponent,
        CheckoutTableComponent,
        CategoriesSelectComponent,
        DishesSelectComponent,
        DishesHistoryComponent,
        DishesSelectingComponent,
        CheckoutBookingComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),

        SharedModule,
        CoreModule,
        RouterModule.forChild(ORDERS_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef,
        PreventUnsavedOrders
    ]
})
export class OrdersModule {

}
