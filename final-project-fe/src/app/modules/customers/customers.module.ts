import { NgModule } from '@angular/core';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomersManageComponent } from './pages/customers-manage/customers-manage.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CUSTOMER_ROUTES } from './customers.routes';
import { CustomerBillsComponent } from './components/customer-bills/customer-bills.component';

@NgModule({
    declarations: [
        CustomersManageComponent,
        CustomersTableComponent,
        CustomerEditComponent,
        CustomerBillsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),

        SharedModule,
        RouterModule.forChild(CUSTOMER_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef
    ]
})
export class CustomersModule {

}
