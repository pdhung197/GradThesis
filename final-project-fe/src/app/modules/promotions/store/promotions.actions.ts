import { Action } from '@ngrx/store';
import { Customer } from 'src/app/shared/models/customer.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Promotion } from 'src/app/shared/models/promotion.model';

export interface SearchPromotions {
    pageNumber;
    pageSize;
    date: string;
}

export interface PromotionParams {
    id;
    promotion?: Promotion;
    params: SearchPromotions;
}

export interface PromotionEditParams {
    id;
    promotion: Promotion;
    formData: FormData;
}

export interface PromotionImageUploadParams {
    id;
    formData: FormData;
}

export const FETCH_PROMOTIONS = '[Promotions] Fetch Promotions';
export const FETCH_ALL_PROMOTIONS = '[Promotions] Fetch All Promotions';
export const SET_PROMOTIONS = '[Promotions] Set Promotions';
export const GET_PROMOTION = '[Promotions] Get Promotion';
export const SET_PROMOTION = '[Promotions] Set Promotion';
export const CREATE_PROMOTION = '[Promotions] Create Promotion';
export const UPDATE_PROMOTION = '[Promotions] Update Promotion';
export const UPLOAD_IMAGE = '[Promotions] Upload Image';
export const CONFIRM_PROMOTION = '[Promotions] Confirm Promotion';
export const DELETE_PROMOTION = '[Promotions] Delete Promotion';

export class FetchPromotions implements Action {
    readonly type = FETCH_PROMOTIONS;
    constructor(public payload: SearchPromotions) {}
}

export class FetchAllPromotions implements Action {
    readonly type = FETCH_ALL_PROMOTIONS;
}

export class SetPromotions implements Action {
    readonly type = SET_PROMOTIONS;
    constructor(public payload: PaginatedResult<Promotion[]>) {}
}

export class GetPromotion implements Action {
    readonly type = GET_PROMOTION;
    constructor(public payload: number) {}
}

export class SetPromotion implements Action {
    readonly type = SET_PROMOTION;
    constructor(public payload: Promotion) {}
}

export class CreatePromotion implements Action {
    readonly type = CREATE_PROMOTION;
    constructor(public payload: PromotionEditParams) {}
}

export class UpdatePromotion implements Action {
    readonly type = UPDATE_PROMOTION;
    constructor(public payload: PromotionEditParams) {}
}

export class UploadImage implements Action {
    readonly type = UPLOAD_IMAGE;
    constructor(public payload: PromotionImageUploadParams) {}
}

export class ConfirmPromotion implements Action {
    readonly type = CONFIRM_PROMOTION;
    constructor(public payload: number) {}
}

export class DeletePromotion implements Action {
    readonly type = DELETE_PROMOTION;
    constructor(public payload: PromotionParams) {}
}

export const FETCH_ALL_DISHES = '[Promotions] Fetch All Dishes';
export const SET_DISHES = '[Promotions] Set Dishes';
export const FETCH_ALL_CUSTOMERS = '[Promotions] Fetch All Customers';
export const SET_CUSTOMERS = '[Promotions] Set Customers';

export class FetchAllDishes implements Action {
    readonly type = FETCH_ALL_DISHES;
}

export class SetDishes implements Action {
    readonly type = SET_DISHES;
    constructor(public payload: Dish[]) {}
}

export class FetchAllCustomers implements Action {
    readonly type = FETCH_ALL_CUSTOMERS;
}

export class SetCustomers implements Action {
    readonly type = SET_CUSTOMERS;
    constructor(public payload: Customer[]) {}
}

export type PromotionsActions =
    | FetchPromotions
    | FetchAllPromotions
    | GetPromotion
    | SetPromotion
    | SetPromotions
    | CreatePromotion
    | UpdatePromotion
    | UploadImage
    | ConfirmPromotion
    | DeletePromotion
    | FetchAllDishes
    | SetDishes
    | FetchAllCustomers
    | SetCustomers;
