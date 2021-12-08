import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { PreventUnsavedOrders } from './guards/prevent-unsaved-orders.guard';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service';
import { OrdersSelectService } from './services/orders-select.service';
import { SidebarService } from './services/sidebar.service';

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        ModalModule.forRoot()
    ],
    exports: [],
    providers: [
        AuthService,
        SidebarService,
        AlertifyService,
        OrdersSelectService,
        MessagingService,
        {
            provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true
        },
        PreventUnsavedOrders,
        BsModalRef
    ]
})
export class CoreModule {

}
