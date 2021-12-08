import { Booking } from './booking.model';
import { Customer } from './customer.model';
import { Order } from './order.model';
import { Promotion } from './promotion.model';
import { Table } from './table.model';

export interface Bill {
    id?: number;
    tableId?: number;
    table?: Table;
    bookingId?: number;
    booking?: Booking;
    customerId?: number;
    customer?: Customer;
    orders?: Order[];
    dateTime?: Date;
    total?: number;
    completed?: boolean;
    promotionId?: number;
    promotion?: Promotion;
}
