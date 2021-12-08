import { Customer } from './customer.model';
import { Promotion } from './promotion.model';

export interface CustomerPromotion {
    customerId?: number;
    customer?: Customer;
    promotionId?: number;
    promotion?: Promotion;
}
