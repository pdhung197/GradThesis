import { Provider } from './provider.model';
import { Material } from './material.model';

export interface ReceiptMaterial {
    id?: number;
    providerId?: number;
    provider?: Provider;
    materialId?: number;
    material?: Material;
    dateTime?: Date;
    amount?: number;
    unitPrice?: number;
    unit?: string;
    note?: string;
}
