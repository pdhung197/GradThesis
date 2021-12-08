import { Dish } from './dish.model';
import { Promotion } from './promotion.model';

export interface DishPromotion {
    dishId?: number;
    dish?: Dish;
    promotionId?: number;
    promotion?: Promotion;
}
