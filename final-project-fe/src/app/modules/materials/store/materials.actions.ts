import { Action } from '@ngrx/store';
import { Material } from 'src/app/shared/models/material.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { Provider } from 'src/app/shared/models/provider.model';
import { ReceiptMaterial } from 'src/app/shared/models/receipt-material.model';

export interface MaterialParams {
    id;
    material?: Material;
    params: SearchParams;
}

export interface ProviderParams {
    id;
    provider?: Provider;
    params: SearchParams;
}

export interface SearchReceipts {
    pageNumber;
    pageSize;
    date: string;
    type: string;
}

export interface SearchParams {
    pageNumber;
    pageSize;
    name: string;
}

export interface ReceiptParams {
    id;
    receipt?: ReceiptMaterial;
    params: SearchReceipts;
}

export const FETCH_MATERIALS = '[Materials] Fetch Materials';
export const FETCH_ALL_MATERIALS = '[Materials] Fetch All Materials';
export const GET_MATERIAL = '[Materials] Get Material';
export const SET_MATERIALS = '[Materials] Set Materials';
export const SET_ALL_MATERIALS = '[Materials] Set All Materials';
export const CREATE_MATERIAL = '[Materials] Create Material';
export const UPDATE_MATERIAL = '[Materials] Update Material';
export const DELETE_MATERIAL = '[Material] Delete Material';

export class FetchMaterials implements Action {
    readonly type = FETCH_MATERIALS;
    constructor(public payload: SearchParams) {}
}

export class FetchAllMaterials implements Action {
    readonly type = FETCH_ALL_MATERIALS;
}

export class GetMaterial implements Action {
    readonly type = GET_MATERIAL;
    constructor(public payload: number) {}
}

export class SetMaterials implements Action {
    readonly type = SET_MATERIALS;
    constructor(public payload: PaginatedResult<Material[]>) {}
}

export class SetAllMaterials implements Action {
    readonly type = SET_ALL_MATERIALS;
    constructor(public payload: Material[]) {}
}

export class CreateMaterial implements Action {
    readonly type = CREATE_MATERIAL;
    constructor(public payload: MaterialParams) {}
}

export class UpdateMaterial implements Action {
    readonly type = UPDATE_MATERIAL;
    constructor(public payload: MaterialParams) {}
}

export class DeleteMaterial implements Action {
    readonly type = DELETE_MATERIAL;
    constructor(public payload: MaterialParams) {}
}

export const FETCH_PROVIDERS = '[Providers] Fetch Providers';
export const FETCH_ALL_PROVIDERS = '[Providers] Fetch All Providers';
export const GET_PROVIDER = '[Providers] Get Provider';
export const SET_PROVIDERS = '[Providers] Set Providers';
export const SET_ALL_PROVIDERS = '[Provider] Set All Providers';
export const CREATE_PROVIDER = '[Providers] Create Provider';
export const UPDATE_PROVIDER = '[Providers] Update Provider';
export const DELETE_PROVIDER = '[Providers] Delete Provider';

export class FetchProviders implements Action {
    readonly type = FETCH_PROVIDERS;
    constructor(public payload: SearchParams) {}
}

export class FetchAllProviders implements Action {
    readonly type = FETCH_ALL_PROVIDERS;
}

export class GetProvider implements Action {
    readonly type = GET_PROVIDER;
    constructor(public payload: number) {}
}

export class SetProviders implements Action {
    readonly type = SET_PROVIDERS;
    constructor(public payload: PaginatedResult<Provider[]>) {}
}

export class SetAllProviders implements Action {
    readonly type = SET_ALL_PROVIDERS;
    constructor(public payload: Provider[]) {}
}

export class CreateProvider implements Action {
    readonly type = CREATE_PROVIDER;
    constructor(public payload: ProviderParams) {}
}

export class UpdateProvider implements Action {
    readonly type = UPDATE_PROVIDER;
    constructor(public payload: ProviderParams) {}
}

export class DeleteProvider implements Action {
    readonly type = DELETE_PROVIDER;
    constructor(public payload: ProviderParams) {}
}

export const FETCH_RECEIPTS = '[Receipts] Fetch Receipts';
export const GET_RECEIPT = '[Receipts] Get Receipt';
export const SET_RECEIPTS = '[Receipts] Set Receipts';
export const CREATE_RECEIPT = '[Receipts] Create Receipt';
export const UPDATE_RECEIPT = '[Receipts] Update Receipt';
export const DELETE_RECEIPT = '[Receipts] Delete Receipt';

export class FetchReceipts implements Action {
    readonly type = FETCH_RECEIPTS;
    constructor(public payload: SearchReceipts) {}
}

export class GetReceipt implements Action {
    readonly type = GET_RECEIPT;
    constructor(public payload: number) {}
}

export class SetReceipts implements Action {
    readonly type = SET_RECEIPTS;
    constructor(public payload: PaginatedResult<ReceiptMaterial[]>) {}
}

export class CreateReceipt implements Action {
    readonly type = CREATE_RECEIPT;
    constructor(public payload: ReceiptParams) {}
}

export class UpdateReceipt implements Action {
    readonly type = UPDATE_RECEIPT;
    constructor(public payload: ReceiptParams) {}
}

export class DeleteReceipt implements Action {
    readonly type = DELETE_RECEIPT;
    constructor(public payload: ReceiptParams) {}
}

export type MaterialsActions =
    | FetchMaterials
    | GetMaterial
    | SetMaterials
    | SetAllMaterials
    | CreateMaterial
    | UpdateMaterial
    | DeleteMaterial
    | FetchProviders
    | FetchAllProviders
    | GetProvider
    | SetProviders
    | SetAllProviders
    | CreateProvider
    | UpdateProvider
    | DeleteProvider
    | FetchReceipts
    | GetReceipt
    | SetReceipts
    | CreateReceipt
    | UpdateReceipt
    | DeleteReceipt;
