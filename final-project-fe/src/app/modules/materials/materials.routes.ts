import { Routes } from '@angular/router';
import { MaterialsManageComponent } from './pages/materials-manage/materials-manage.component';
import { ProvidersManageComponent } from './pages/providers-manage/providers-manage.component';
import { ReceiptsManageComponent } from './pages/receipts-manage/receipts-manage.component';

export const MATERIALS_ROUTES: Routes = [
    {
        path: '',
        component: MaterialsManageComponent
    },
    {
        path: 'nha-cung-cap',
        component: ProvidersManageComponent
    },
    {
        path: 'lich-su',
        component: ReceiptsManageComponent
    }
];
