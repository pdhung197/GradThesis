import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { OrdersBookingComponent } from 'src/app/modules/home/pages/orders-booking/orders-booking.component';

@Injectable()
export class HomePreventUnsavedOrders implements CanDeactivate<OrdersBookingComponent> {
    canDeactivate(component: OrdersBookingComponent) {
        if (component.ordersSelectService.ordersSelected.length) {
            return confirm('Danh sách các món ăn đang chọn sẽ bị mất! Bạn có muốn tiếp tục?');
        }
        return true;
    }
}
