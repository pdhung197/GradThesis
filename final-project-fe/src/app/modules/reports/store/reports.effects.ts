import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { Bill } from 'src/app/shared/models/bill.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { environment } from 'src/environments/environment';
import * as ReportsActions from '../store/reports.actions';
import { BillDetail, ReceiptMaterialDetail, SummaryReport } from '../store/reports.actions';

@Injectable()
export class ReportEffects {

    @Effect()
    fetchSummary = this.actions$.pipe(
        ofType(ReportsActions.FETCH_SUMMARY),
        switchMap((action: ReportsActions.FetchSummary) => {
            const params = new HttpParams()
                .append(ParamsConstant.dateFrom, action.payload.dateFrom)
                .append(ParamsConstant.dateTo, action.payload.dateTo);

            return this.http.get<SummaryReport>(`${environment.apiUrl}/reports/summary`, {
                observe: 'response',
                params
            }).pipe(
                    map((response) => {
                        return new ReportsActions.SetSummary(response.body);
                    })
                );
        })
    );

    @Effect()
    fetchMaterialDetails = this.actions$.pipe(
        ofType(ReportsActions.FETCH_MATERIAL_DETAILS),
        switchMap((action: ReportsActions.FetchMaterialDetails) => {
            const params = new HttpParams()
                .append(ParamsConstant.dateFrom, action.payload.dateFrom)
                .append(ParamsConstant.dateTo, action.payload.dateTo);

            return this.http.get<ReceiptMaterialDetail[]>(`${environment.apiUrl}/reports/detail/material`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    return new ReportsActions.SetMaterialDetails(response.body);
                })
            );
        })
    );

    @Effect()
    fetchBillDetails = this.actions$.pipe(
        ofType(ReportsActions.FETCH_BILL_DETAILS),
        switchMap((action: ReportsActions.FetchBillDetails) => {
            const paginatedResult = new PaginatedResult<BillDetail[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.dateFrom, action.payload.dateFrom)
                .append(ParamsConstant.dateTo, action.payload.dateTo);

            return this.http.get<BillDetail[]>(`${environment.apiUrl}/reports/detail/bill`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new ReportsActions.SetBillDetails(paginatedResult);
                })
            );
        })
    );

    @Effect()
    deleteBill = this.actions$.pipe(
        ofType(ReportsActions.DELETE_BILL),
        switchMap((action: ReportsActions.DeleteBill) => {
            return this.http.delete<void>(`${environment.apiUrl}/bills/${action.payload.id}`)
                .pipe(
                    map(() => {
                        return new ReportsActions.FetchBillDetails(action.payload.reportParams);
                    })
                );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
