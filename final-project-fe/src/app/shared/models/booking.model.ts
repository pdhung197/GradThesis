import { Order } from './order.model';
import { Table } from './table.model';

export interface Booking {
    id?: number;
    customerName?: string;
    phone?: string;
    email?: string;
    bookingTime?: Date | string;
    numberOfPeople?: number;
    deposit?: number;
    status?: string;
    note?: string;
    orders?: Order[];
    tableId?: number;
    table?: Table;
    forWedding?: boolean;
}
