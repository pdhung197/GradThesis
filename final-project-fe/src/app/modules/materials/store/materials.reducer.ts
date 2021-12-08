import { Material } from 'src/app/shared/models/material.model';
import * as MaterialsActions from './materials.actions';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Provider } from 'src/app/shared/models/provider.model';
import { ReceiptMaterial } from 'src/app/shared/models/receipt-material.model';

export interface State {
    materials: PaginatedResult<Material[]>;
    providers: PaginatedResult<Provider[]>;
    receipts: PaginatedResult<ReceiptMaterial[]>;
    allProviders: Provider[];
    allMaterials: Material[];
}

const initMaterials = new PaginatedResult<Material[]>();
initMaterials.result = [];
initMaterials.pagination = {
    totalItems: 0
};

const initProviders = new PaginatedResult<Provider[]>();
initProviders.result = [];
initProviders.pagination = {
    totalItems: 0
};

const initReceipts = new PaginatedResult<ReceiptMaterial[]>();
initReceipts.result = [];
initReceipts.pagination = {
    totalItems: 0
};

export const initialState: State = {
    materials: initMaterials,
    providers: initProviders,
    receipts: initReceipts,
    allProviders: [],
    allMaterials: []
};

export function materialReducer(
    state: State = initialState,
    action: MaterialsActions.MaterialsActions
) {
    switch (action.type) {
        case MaterialsActions.SET_MATERIALS:
            return {
                ...state,
                materials: action.payload
            };
        case MaterialsActions.SET_PROVIDERS:
            return {
                ...state,
                providers: action.payload
            };
        case MaterialsActions.SET_RECEIPTS:
            return {
                ...state,
                receipts: action.payload
            };
        case MaterialsActions.SET_ALL_PROVIDERS:
            return {
                ...state,
                allProviders: action.payload
            };
        case MaterialsActions.SET_ALL_MATERIALS:
            return {
                ...state,
                allMaterials: action.payload
            };
        default:
            return state;
    }
}
