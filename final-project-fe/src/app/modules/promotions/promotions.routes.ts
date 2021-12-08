import { Routes } from '@angular/router';
import { PromotionEditComponent } from './pages/promotion-edit/promotion-edit.component';
import { PromotionsManageComponent } from './pages/promotions-manage/promotions-manage.component';

export const PROMOTIONS_ROUTES: Routes = [
    {
        path: '',
        component: PromotionsManageComponent
    },
    {
        path: ':id',
        component: PromotionEditComponent
    }
];
