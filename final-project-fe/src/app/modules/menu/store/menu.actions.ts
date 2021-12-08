import { Action } from '@ngrx/store';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { DishRecipe } from 'src/app/shared/models/dish-recipe.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';

export interface CategoryParams {
    id;
    category?: DishCategory;
}

export interface SearchDishes {
    pageNumber;
    pageSize;
    name: string;
    categoryId;
}

export interface DishParams {
    id;
    dish?: Dish;
    params: SearchDishes;
}

export interface DishRecipesParams {
    id;
    recipes: DishRecipe[];
}

export interface DishImageUploadParams {
    id;
    formData: FormData;
    params: SearchDishes;
}

export const FETCH_CATEGORIES = '[Categories] Fetch All Categories';
export const GET_CATEGORY = '[Categories] Get Category';
export const SET_CATEGORIES = '[Categories] Set Categories';
export const CREATE_CATEGORY = '[Categories] Create Category';
export const UPDATE_CATEGORY = '[Categories] Update Category';
export const DELETE_CATEGORY = '[Categories] Delete Category';

export class FetchCategories implements Action {
    readonly type = FETCH_CATEGORIES;
}

export class GetCategory implements Action {
    readonly type = GET_CATEGORY;
    constructor(public payload: number) {}
}

export class SetCategories implements Action {
    readonly type = SET_CATEGORIES;
    constructor(public payload: DishCategory[]) {}
}

export class CreateCategory implements Action {
    readonly type = CREATE_CATEGORY;
    constructor(public payload: CategoryParams) {}
}

export class UpdateCategory implements Action {
    readonly type = UPDATE_CATEGORY;
    constructor(public payload: CategoryParams) {}
}

export class DeleteCategory implements Action {
    readonly type = DELETE_CATEGORY;
    constructor(public payload: CategoryParams) {}
}

export const FETCH_DISHES = '[Dishes] Fetch Dishes';
export const GET_DISH = '[Dishes] Get Dish';
export const SET_DISHES = '[Dishes] Set Dishes';
export const SET_DISH = '[Dishes] Set Dish';
export const CREATE_DISH = '[Dishes] Create Dish';
export const UPDATE_DISH = '[Dishes] Update Dish';
export const UPDATE_DISH_RECIPE = '[Dishes] Update Dish Recipes';
export const UPLOAD_IMAGE = '[Dishes] Upload Image';
export const DELETE_DISH = '[Dishes] Delete Dish';

export class FetchDishes implements Action {
    readonly type = FETCH_DISHES;
    constructor(public payload: SearchDishes) {}
}

export class GetDish implements Action {
    readonly type = GET_DISH;
    constructor(public payload: number) {}
}

export class SetDishes implements Action {
    readonly type = SET_DISHES;
    constructor(public payload: PaginatedResult<Dish[]>) {}
}

export class SetDish implements Action {
    readonly type = SET_DISH;
    constructor(public payload: Dish) {}
}

export class CreateDish implements Action {
    readonly type = CREATE_DISH;
    constructor(public payload: DishParams) {}
}

export class UpdateDish implements Action {
    readonly type = UPDATE_DISH;
    constructor(public payload: DishParams) {}
}

export class UpdateDishRecipes implements Action {
    readonly type = UPDATE_DISH_RECIPE;
    constructor(public payload: DishRecipesParams) {}
}

export class UploadImage implements Action {
    readonly type = UPLOAD_IMAGE;
    constructor(public payload: DishImageUploadParams) {}
}

export class DeleteDish implements Action {
    readonly type = DELETE_DISH;
    constructor(public payload: DishParams) {}
}

export type MenuActions =
    | FetchCategories
    | GetCategory
    | SetCategories
    | CreateCategory
    | UpdateCategory
    | DeleteCategory
    | FetchDishes
    | GetDish
    | SetDishes
    | SetDish
    | CreateDish
    | UpdateDish
    | UpdateDishRecipes
    | UploadImage
    | DeleteDish;
