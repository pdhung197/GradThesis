import * as MaterialsActions from './materials.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap, map, tap } from 'rxjs/operators';
import { Material } from 'src/app/shared/models/material.model';
import { environment } from 'src/environments/environment';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Provider } from 'src/app/shared/models/provider.model';
import { ReceiptMaterial } from 'src/app/shared/models/receipt-material.model';
import { Router } from '@angular/router';

@Injectable()
export class MaterialEffects {
    @Effect()
    fetchMaterials = this.actions$.pipe(
        ofType(MaterialsActions.FETCH_MATERIALS),
        switchMap((action: MaterialsActions.FetchMaterials) => {
            const paginatedResult: PaginatedResult<Material[]> = new PaginatedResult<Material[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name);

            return this.http.get<Material[]>(`${environment.apiUrl}/materials`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new MaterialsActions.SetMaterials(paginatedResult);
                })
            );
        })
    );

    @Effect()
    fetchAllMaterials = this.actions$.pipe(
        ofType(MaterialsActions.FETCH_ALL_MATERIALS),
        switchMap((action: MaterialsActions.FetchAllMaterials) => {
            return this.http.get<Material[]>(`${environment.apiUrl}/materials/all`)
                .pipe(
                    map((response) => {
                        return new MaterialsActions.SetAllMaterials(response);
                    })
                );
        })
    );

    @Effect()
    createMaterial = this.actions$.pipe(
        ofType(MaterialsActions.CREATE_MATERIAL),
        switchMap((action: MaterialsActions.CreateMaterial) => {
            return this.http.post<Material>(`${environment.apiUrl}/materials`, action.payload.material)
                .pipe(
                    map(() => {
                        return new MaterialsActions.FetchMaterials(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateMaterial = this.actions$.pipe(
        ofType(MaterialsActions.UPDATE_MATERIAL),
        switchMap((action: MaterialsActions.UpdateMaterial) => {
            return this.http.put<Material>(`${environment.apiUrl}/materials`, action.payload.material)
                .pipe(
                    map(() => {
                        return new MaterialsActions.FetchMaterials(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteMaterial = this.actions$.pipe(
        ofType(MaterialsActions.DELETE_MATERIAL),
        switchMap((action: MaterialsActions.DeleteMaterial) => {
            return this.http.delete<void>(`${environment.apiUrl}/materials/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new MaterialsActions.FetchMaterials(action.payload.params);
                })
            );
        })
    );

    @Effect()
    fetchProviders = this.actions$.pipe(
        ofType(MaterialsActions.FETCH_PROVIDERS),
        switchMap((action: MaterialsActions.FetchProviders) => {
            const paginatedResult: PaginatedResult<Provider[]> = new PaginatedResult<Provider[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name);

            return this.http.get<Provider[]>(`${environment.apiUrl}/providers`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new MaterialsActions.SetProviders(paginatedResult);
                })
            );
        })
    );

    @Effect()
    fetchAllProviders = this.actions$.pipe(
        ofType(MaterialsActions.FETCH_ALL_PROVIDERS),
        switchMap((action: MaterialsActions.FetchAllProviders) => {
            return this.http.get<Provider[]>(`${environment.apiUrl}/providers/all`)
                .pipe(
                    map((response) => {
                        return new MaterialsActions.SetAllProviders(response);
                    })
                );
        })
    );

    @Effect()
    createProvider = this.actions$.pipe(
        ofType(MaterialsActions.CREATE_PROVIDER),
        switchMap((action: MaterialsActions.CreateProvider) => {
            return this.http.post<Provider>(`${environment.apiUrl}/providers`, action.payload.provider)
                .pipe(
                    map(() => {
                        return new MaterialsActions.FetchProviders(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateProvider = this.actions$.pipe(
        ofType(MaterialsActions.UPDATE_PROVIDER),
        switchMap((action: MaterialsActions.UpdateProvider) => {
            return this.http.put<Provider>(`${environment.apiUrl}/providers`, action.payload.provider)
                .pipe(
                    map(() => {
                        return new MaterialsActions.FetchProviders(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteProvider = this.actions$.pipe(
        ofType(MaterialsActions.DELETE_PROVIDER),
        switchMap((action: MaterialsActions.DeleteProvider) => {
            return this.http.delete<void>(`${environment.apiUrl}/materials/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new MaterialsActions.FetchProviders(action.payload.params);
                })
            );
        })
    );

    @Effect()
    fetchReceipts = this.actions$.pipe(
        ofType(MaterialsActions.FETCH_RECEIPTS),
        switchMap((action: MaterialsActions.FetchReceipts) => {
            const paginatedResult: PaginatedResult<ReceiptMaterial[]> = new PaginatedResult<ReceiptMaterial[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.dateSearch, action.payload.date)
                .append(ParamsConstant.receiptType, action.payload.type);

            return this.http.get<ReceiptMaterial[]>(`${environment.apiUrl}/receipts`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new MaterialsActions.SetReceipts(paginatedResult);
                })
            );
        })
    );

    @Effect( { dispatch: false })
    createReceipt = this.actions$.pipe(
        ofType(MaterialsActions.CREATE_RECEIPT),
        switchMap((action: MaterialsActions.CreateReceipt) => {
            return this.http.post<ReceiptMaterial>(`${environment.apiUrl}/receipts`, action.payload.receipt)
                .pipe(
                    tap(() => {
                        this.router.navigate(['quan-ly/nguyen-lieu/lich-su']);
                    })
                );
        })
    );

    @Effect()
    updateReceipt = this.actions$.pipe(
        ofType(MaterialsActions.UPDATE_RECEIPT),
        switchMap((action: MaterialsActions.UpdateReceipt) => {
            return this.http.put<ReceiptMaterial>(`${environment.apiUrl}/receipts`, action.payload.receipt)
                .pipe(
                    map(() => {
                        return new MaterialsActions.FetchReceipts(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteReceipt = this.actions$.pipe(
        ofType(MaterialsActions.DELETE_RECEIPT),
        switchMap((action: MaterialsActions.DeleteReceipt) => {
            return this.http.delete<void>(`${environment.apiUrl}/receipts/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new MaterialsActions.FetchReceipts(action.payload.params);
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
