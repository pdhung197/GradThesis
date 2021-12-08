import { Dish } from './dish.model';
import { Material } from './material.model';

export interface DishRecipe {
    dishId?: number;
    dish?: Dish;
    materialId?: number;
    material?: Material;
    amount?: string;
}
