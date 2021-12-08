import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { Customer } from 'src/app/shared/models/customer.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Promotion } from 'src/app/shared/models/promotion.model';
import { environment } from 'src/environments/environment';
import * as PromotionsActions from '../store/promotions.actions';

@Injectable()
export class PromotionEffects {
    @Effect()
    fetchPromotions = this.actions$.pipe(
        ofType(PromotionsActions.FETCH_PROMOTIONS),
        switchMap((action: PromotionsActions.FetchPromotions) => {
            const paginatedResult: PaginatedResult<Promotion[]> = new PaginatedResult<Promotion[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.dateSearch, action.payload.date);

            return this.http.get<Promotion[]>(`${environment.apiUrl}/promotions`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new PromotionsActions.SetPromotions(paginatedResult);
                })
            );
        })
    );

    @Effect()
    getPromotion = this.actions$.pipe(
        ofType(PromotionsActions.GET_PROMOTION),
        switchMap((action: PromotionsActions.GetPromotion) => {
            return this.http.get<Promotion>(`${environment.apiUrl}/promotions/${action.payload}`)
                .pipe(
                    map((response) => {
                        return new PromotionsActions.SetPromotion(response);
                    })
                );
        })
    );

    @Effect()
    createPromotion = this.actions$.pipe(
        ofType(PromotionsActions.CREATE_PROMOTION),
        switchMap((action: PromotionsActions.CreatePromotion) => {
            return this.http.post<Promotion>(`${environment.apiUrl}/promotions`, action.payload.promotion)
                .pipe(
                    map((response) => {
                        const params: PromotionsActions.PromotionImageUploadParams = {
                            id: response.id,
                            formData: action.payload.formData
                        };
                        return new PromotionsActions.UploadImage(params);
                    })
                );
        })
    );

    @Effect()
    updatePromotion = this.actions$.pipe(
        ofType(PromotionsActions.UPDATE_PROMOTION),
        switchMap((action: PromotionsActions.UpdatePromotion) => {
            return this.http.put<Promotion>(`${environment.apiUrl}/promotions`, action.payload.promotion)
                .pipe(
                    map((response) => {
                        const params: PromotionsActions.PromotionImageUploadParams = {
                            id: response.id,
                            formData: action.payload.formData
                        };
                        return new PromotionsActions.UploadImage(params);
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    uploadImage = this.actions$.pipe(
        ofType(PromotionsActions.UPLOAD_IMAGE),
        switchMap((action: PromotionsActions.UploadImage) => {
            return this.http.put<void>(`${environment.apiUrl}/promotions/${action.payload.id}/files`, action.payload.formData)
                .pipe(
                    tap(() => {
                        this.router.navigate(['quan-ly/uu-dai']);
                    })
                );
        })
    );

    @Effect()
    confirmPromotion = this.actions$.pipe(
        ofType(PromotionsActions.CONFIRM_PROMOTION),
        switchMap((action: PromotionsActions.ConfirmPromotion) => {
            return this.http.put<void>(`${environment.apiUrl}/promotions/${action.payload}/confirm`, {})
                .pipe(
                    map(() => {
                        return new PromotionsActions.GetPromotion(action.payload);
                    })
                );
        })
    );

    @Effect()
    deletePromotion = this.actions$.pipe(
        ofType(PromotionsActions.DELETE_PROMOTION),
        switchMap((action: PromotionsActions.DeletePromotion) => {
            return this.http.delete<void>(`${environment.apiUrl}/promotions/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new PromotionsActions.FetchPromotions(action.payload.params);
                })
            );
        })
    );

    @Effect()
    fetchAllDishes = this.actions$.pipe(
        ofType(PromotionsActions.FETCH_ALL_DISHES),
        switchMap((action: PromotionsActions.FetchAllDishes) => {
            return this.http.get<Dish[]>(`${environment.apiUrl}/dishes/all`)
                .pipe(
                    map((response) => {
                        return new PromotionsActions.SetDishes(response);
                    })
                );
        })
    );

    @Effect()
    fetchAllCustomers = this.actions$.pipe(
        ofType(PromotionsActions.FETCH_ALL_CUSTOMERS),
        switchMap((action: PromotionsActions.FetchAllCustomers) => {
            return this.http.get<Customer[]>(`${environment.apiUrl}/customers/all`)
                .pipe(
                    map((response) => {
                        return new PromotionsActions.SetCustomers(response);
                    })
                );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
