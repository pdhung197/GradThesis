import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrdersSelectService {
    public dishesSelected = 0;
    public ordersSelected = [];
}
