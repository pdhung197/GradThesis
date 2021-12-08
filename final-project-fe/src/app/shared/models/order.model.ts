import { Bill } from './bill.model';
import { Booking } from './booking.model';
import { Dish } from './dish.model';
import { Promotion } from './promotion.model';

export interface Order {
    billId?: number;
    bill?: Bill;
    bookingId?: number;
    booking?: Booking;
    dishId?: number;
    dish?: Dish;
    amount?: number;
    promotionId?: number;
    promotion?: Promotion;
    total?: number;
}
