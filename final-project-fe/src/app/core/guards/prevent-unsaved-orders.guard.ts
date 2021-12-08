import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TableOrdersComponent } from 'src/app/modules/orders/pages/table-orders/table-orders.component';

@Injectable()
export class PreventUnsavedOrders implements CanDeactivate<TableOrdersComponent> {
    canDeactivate(component: TableOrdersComponent) {
        if (component.ordersSelectService.ordersSelected.length) {
            return confirm('Danh sách các món ăn đang chọn sẽ bị mất! Bạn có muốn tiếp tục?');
        }
        return true;
    }
}
