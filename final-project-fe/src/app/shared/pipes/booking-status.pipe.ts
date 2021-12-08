import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bookingStatus' })
export class BookingStatusPipe implements PipeTransform {
    transform(value: string): string {
        const status = value.toLowerCase();

        if (status === 'notconfirmed') { return 'Chưa xác nhận'; }
        if (status === 'confirmed') { return 'Đã xác nhận'; }
        if (status === 'cancelled') { return 'Đã hủy'; }
        if (status === 'notarrived') { return 'Chưa đến'; }
        return 'Đã hoàn thành';
    }
}

@Pipe({ name: 'weddingBookingStatus' })
export class WeddingBookingStatusPipe implements PipeTransform {
    transform(value: string): string {
        const status = value.toLowerCase();

        if (status === 'notconfirmed') { return 'Chưa xác nhận'; }
        if (status === 'confirmed') { return 'Đã đặt cọc'; }
        if (status === 'cancelled') { return 'Đã hủy'; }
        return 'Đã hoàn thành';
    }
}
