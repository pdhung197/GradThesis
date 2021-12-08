import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { BOOKINGS_ROUTES } from './bookings.routes';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { BookingsManageComponent } from './pages/bookings-manage/bookings-manage.component';
import { BookingEditComponent } from './components/booking-edit/booking-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TableSelectComponent } from './components/table-select/table-select.component';
import { BookingOrdersComponent } from './components/booking-orders/booking-orders.component';
import { WeddingBookingsManageComponent } from './pages/wedding-bookings-manage/wedding-bookings-manage.component';
import { WeddingBookingsTableComponent } from './components/wedding-bookings-table/wedding-bookings-table.component';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';

const CustomSelectOptions: INgxSelectOptions = {
    optionValueField: 'id',
    optionTextField: 'name',
    keepSelectedItems: false
};

@NgModule({
    declarations: [
        BookingsManageComponent,
        BookingsTableComponent,
        BookingEditComponent,
        TableSelectComponent,
        BookingOrdersComponent,
        WeddingBookingsManageComponent,
        WeddingBookingsTableComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NgxSelectModule.forRoot(CustomSelectOptions),

        RouterModule.forChild(BOOKINGS_ROUTES),
        SharedModule
    ],
    exports: [],
    providers: [
        BsModalRef
    ]
})
export class BookingsModule {

}
