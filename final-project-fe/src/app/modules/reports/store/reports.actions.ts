import { Action } from '@ngrx/store';
import { Bill } from 'src/app/shared/models/bill.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';

export interface SummaryReport {
    materialTotal: number;
    billTotal: number;
}

export interface ReportParams {
    dateFrom: string;
    dateTo: string;
    pageSize?;
    pageNumber?;
}

export interface ReceiptMaterialDetail {
    id?: number;
    dateTime?: Date;
    materialName?: string;
    amount?: number;
    unit?: string;
    unitPrice?: number;
    total?: number;
}

export interface BillDetail {
    id?: number;
    dateTime?: Date;
    total?: number;
    bills?: Bill[];
}

export interface DeleteBillParams {
    id;
    reportParams: ReportParams;
}

export const FETCH_SUMMARY = '[Reports] Fetch Summary Report';
export const SET_SUMMARY = '[Reports] Set Summary Report';
export const FETCH_MATERIAL_DETAILS = '[Reports] Fetch Material Details';
export const SET_MATERIAL_DETAILS = '[Reports] Set Material Details';
export const FETCH_BILL_DETAILS = '[Reports] Fetch Bill Details';
export const SET_BILL_DETAILS = '[Reports] Set Bill Details';

export class FetchSummary implements Action {
    readonly type = FETCH_SUMMARY;
    constructor(public payload: ReportParams) {}
}

export class SetSummary implements Action {
    readonly type = SET_SUMMARY;
    constructor(public payload: SummaryReport) {}
}

export class FetchMaterialDetails implements Action {
    readonly type = FETCH_MATERIAL_DETAILS;
    constructor(public payload: ReportParams) {}
}

export class SetMaterialDetails implements Action {
    readonly type = SET_MATERIAL_DETAILS;
    constructor(public payload: ReceiptMaterialDetail[]) {}
}

export class FetchBillDetails implements Action {
    readonly type = FETCH_BILL_DETAILS;
    constructor(public payload: ReportParams) {}
}

export class SetBillDetails implements Action {
    readonly type = SET_BILL_DETAILS;
    constructor(public payload: PaginatedResult<BillDetail[]>) {}
}

export const DELETE_BILL = '[Reports] Delete Bill';

export class DeleteBill implements Action {
    readonly type = DELETE_BILL;
    constructor(public payload: DeleteBillParams) {}
}

export type ReportsActions =
    | FetchSummary
    | SetSummary
    | FetchMaterialDetails
    | SetMaterialDetails
    | FetchBillDetails
    | SetBillDetails
    | DeleteBill;
