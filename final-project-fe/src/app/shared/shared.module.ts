import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { RouterModule } from '@angular/router';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingStatusPipe, WeddingBookingStatusPipe } from './pipes/booking-status.pipe';
import { DiscountAmountPipe, PromotionTypePipe } from './pipes/promotion.pipe';
import { CommonModule } from '@angular/common';
import { Error401PageComponent } from './components/error-401-page/error-401-page.component';
import { Error500PageComponent } from './components/error-500-page/error-500-page.component';
import { BookingNotificationModalComponent } from './components/booking-notification-modal/booking-notification-modal.component';

@NgModule({
    declarations: [
        HeaderComponent,
        BodyComponent,
        SidebarComponent,
        ConfirmModalComponent,
        BookingStatusPipe,
        WeddingBookingStatusPipe,
        PromotionTypePipe,
        DiscountAmountPipe,
        Error401PageComponent,
        Error500PageComponent,
        BookingNotificationModalComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ModalModule.forRoot(),
    ],
    exports: [
        HeaderComponent,
        BodyComponent,
        SidebarComponent,
        ConfirmModalComponent,
        BookingStatusPipe,
        WeddingBookingStatusPipe,
        PromotionTypePipe,
        DiscountAmountPipe,
        Error401PageComponent,
        Error500PageComponent,
        BookingNotificationModalComponent
    ],
    providers: [
        BsModalRef
    ]
})
export class SharedModule {

}
