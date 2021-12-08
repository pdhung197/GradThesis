import { Injectable } from '@angular/core';
import * as MenuActions from './menu.actions';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';

@Injectable()
export class MenuEffects {
    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(MenuActions.FETCH_CATEGORIES),
        switchMap((action: MenuActions.FetchCategories) => {
            return this.http.get<DishCategory[]>(`${environment.apiUrl}/dish-categories`)
                .pipe(
                    map((response) => {
                        return new MenuActions.SetCategories(response);
                    })
                );
        })
    );

    @Effect()
    createCategory = this.actions$.pipe(
        ofType(MenuActions.CREATE_CATEGORY),
        switchMap((action: MenuActions.CreateCategory) => {
            return this.http.post<DishCategory>(`${environment.apiUrl}/dish-categories`, action.payload.category)
                .pipe(
                    map(() => {
                        return new MenuActions.FetchCategories();
                    })
                );
        })
    );

    @Effect()
    updateCategory = this.actions$.pipe(
        ofType(MenuActions.UPDATE_CATEGORY),
        switchMap((action: MenuActions.UpdateCategory) => {
            return this.http.put<DishCategory>(`${environment.apiUrl}/dish-categories`, action.payload.category)
                .pipe(
                    map(() => {
                        return new MenuActions.FetchCategories();
                    })
                );
        })
    );

    @Effect()
    deleteCategory = this.actions$.pipe(
        ofType(MenuActions.DELETE_CATEGORY),
        switchMap((action: MenuActions.DeleteCategory) => {
            return this.http.delete<void>(`${environment.apiUrl}/dish-categories/${action.payload.id}`)
                .pipe(
                    map(() => {
                        return new MenuActions.FetchCategories();
                    })
                );
        })
    );

    @Effect()
    fetchDishes = this.actions$.pipe(
        ofType(MenuActions.FETCH_DISHES),
        switchMap((action: MenuActions.FetchDishes) => {
            const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name)
                .append(ParamsConstant.categorySearch, action.payload.categoryId);

            return this.http.get<Dish[]>(`${environment.apiUrl}/dishes`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new MenuActions.SetDishes(paginatedResult);
                })
            );
        })
    );

    @Effect()
    getDish = this.actions$.pipe(
        ofType(MenuActions.GET_DISH),
        switchMap((action: MenuActions.GetDish) => {
            return this.http.get<Dish>(`${environment.apiUrl}/dishes/${action.payload}`)
                .pipe(
                    map((response) => {
                        return new MenuActions.SetDish(response);
                    })
                );
        })
    );

    @Effect()
    createDish = this.actions$.pipe(
        ofType(MenuActions.CREATE_DISH),
        switchMap((action: MenuActions.CreateDish) => {
            return this.http.post<Dish>(`${environment.apiUrl}/dishes`, action.payload.dish)
                .pipe(
                    map(() => {
                        return new MenuActions.FetchDishes(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateDish = this.actions$.pipe(
        ofType(MenuActions.UPDATE_DISH),
        switchMap((action: MenuActions.UpdateDish) => {
            return this.http.put<Dish>(`${environment.apiUrl}/dishes`, action.payload.dish)
                .pipe(
                    map(() => {
                        return new MenuActions.FetchDishes(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateDishRecipes = this.actions$.pipe(
        ofType(MenuActions.UPDATE_DISH_RECIPE),
        switchMap((action: MenuActions.UpdateDishRecipes) => {
            return this.http.put<void>(`${environment.apiUrl}/dishes/${action.payload.id}`, action.payload.recipes)
                .pipe(
                    map(() => {
                        return new MenuActions.SetDish({});
                    })
                );
        })
    );

    @Effect()
    uploadImage = this.actions$.pipe(
        ofType(MenuActions.UPLOAD_IMAGE),
        switchMap((action: MenuActions.UploadImage) => {
            return this.http.put<void>(`${environment.apiUrl}/dishes/${action.payload.id}/files`, action.payload.formData)
                .pipe(
                    map(() => {
                        return new MenuActions.FetchDishes(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteDish = this.actions$.pipe(
        ofType(MenuActions.DELETE_DISH),
        switchMap((action: MenuActions.DeleteDish) => {
            return this.http.delete<void>(`${environment.apiUrl}/dishes/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new MenuActions.FetchDishes(action.payload.params);
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
