import { Attachment } from './attachment.model';
import { DishCategory } from './dish-category.model';
import { DishRecipe } from './dish-recipe.model';

export interface Dish {
    id?: number;
    name?: string;
    unit?: string;
    price?: number;
    description?: string;
    categoryId?: number;
    category?: DishCategory;
    recipes?: DishRecipe[];
    attachmentId?: number;
    attachment?: Attachment;
}
