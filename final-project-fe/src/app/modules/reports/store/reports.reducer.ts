import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import * as ReportsActions from '../store/reports.actions';
import { BillDetail, ReceiptMaterialDetail, SummaryReport } from '../store/reports.actions';

export interface State {
    summaryReport: SummaryReport;
    materialDetails: ReceiptMaterialDetail[];
    billDetails: PaginatedResult<BillDetail[]>;
}

const initBillDetails = new PaginatedResult<BillDetail[]>();
initBillDetails.pagination = {
    totalItems: 0
};
initBillDetails.result = []

export const initialState: State = {
    summaryReport: {
        materialTotal: 0,
        billTotal: 0
    },
    materialDetails: [],
    billDetails: initBillDetails
};

export function reportReducer(
    state: State = initialState,
    action: ReportsActions.ReportsActions
) {
    switch (action.type) {
        case ReportsActions.SET_SUMMARY:
            return {
                ...state,
                summaryReport: action.payload
            };
        case ReportsActions.SET_MATERIAL_DETAILS:
            return {
                ...state,
                materialDetails: action.payload
            };
        case ReportsActions.SET_BILL_DETAILS:
            return {
                ...state,
                billDetails: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
