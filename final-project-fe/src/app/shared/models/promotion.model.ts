import { Attachment } from './attachment.model';
import { CustomerPromotion } from './customer-promotion.model';
import { DishPromotion } from './dish-promotion.model';

export interface Promotion {
    id?: number;
    describe?: string;
    detail?: string;
    attachmentId?: number;
    attachment?: Attachment;
    discountType?: string;
    discountAmount?: number;
    promotionType?: string;
    billCondition?: number;
    startTime?: Date | string;
    endTime?: Date | string;
    confirmed?: boolean;
    dishes?: DishPromotion[];
    customers?: CustomerPromotion[];
}
