import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order.model';
import { Promotion } from '../models/promotion.model';

@Pipe({ name: 'promotionType' })
export class PromotionTypePipe implements PipeTransform {
    transform(value: string): string {
        const status = value.toLowerCase();

        if (status === 'dishpromo') { return 'KM Món ăn'; }
        if (status === 'billpromo') { return 'KM Hóa đơn'; }
        if (status === 'customerpromo') { return 'KM Khách hàng'; }
        return 'KM Hóa đơn';
    }
}

@Pipe({ name: 'discountAmount' })
export class DiscountAmountPipe implements PipeTransform {
    transform(value: Promotion): string {
        if (value?.discountType === 'Percent') {
            return `${value.discountAmount} %`;
        } else if (value?.discountType === 'Amount') {
            return `${value.discountAmount} VND`;
        }
        if (value === null) {
            return '';
        }
    }
}
