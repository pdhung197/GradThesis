import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { PromotionsTableComponent } from './components/promotions-table/promotions-table.component';
import { PromotionEditComponent } from './pages/promotion-edit/promotion-edit.component';
import { PromotionsManageComponent } from './pages/promotions-manage/promotions-manage.component';
import { PROMOTIONS_ROUTES } from './promotions.routes';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

const CustomSelectOptions: INgxSelectOptions = {
    optionValueField: 'id',
    optionTextField: 'name',
    keepSelectedItems: false
};

@NgModule({
    declarations: [
        PromotionsManageComponent,
        PromotionsTableComponent,
        PromotionEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        ModalModule.forRoot(),
        NgxSelectModule.forRoot(CustomSelectOptions),

        SharedModule,
        RouterModule.forChild(PROMOTIONS_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef
    ]
})
export class PromotionsModule {

}
