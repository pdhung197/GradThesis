import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MATERIALS_ROUTES } from './materials.routes';
import { MaterialsManageComponent } from './pages/materials-manage/materials-manage.component';
import { MaterialsTableComponent } from './components/materials-table/materials-table.component';
import { CommonModule } from '@angular/common';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { MaterialEditComponent } from './components/material-edit/material-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProvidersManageComponent } from './pages/providers-manage/providers-manage.component';
import { ProvidersTableComponent } from './components/providers-table/providers-table.component';
import { ProviderEditComponent } from './components/provider-edit/provider-edit.component';
import { ReceiptsManageComponent } from './pages/receipts-manage/receipts-manage.component';
import { ReceiptsTableComponent } from './components/receipts-table/receipts-table.component';
import { ReceiptEditComponent } from './components/receipt-edit/receipt-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        MaterialsManageComponent,
        MaterialsTableComponent,
        MaterialEditComponent,
        ProvidersManageComponent,
        ProvidersTableComponent,
        ProviderEditComponent,
        ReceiptsManageComponent,
        ReceiptsTableComponent,
        ReceiptEditComponent
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),

        SharedModule,
        RouterModule.forChild(MATERIALS_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef
    ]
})
export class MaterialsModule {

}
