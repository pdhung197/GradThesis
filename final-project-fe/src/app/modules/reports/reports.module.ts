import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailTableComponent } from './components/detail-table/detail-table.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { REPORTS_ROUTES } from './reports.routes';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BillDetailComponent } from './components/bill-detail/bill-detail.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        ReportsPageComponent,
        SummaryComponent,
        DetailTableComponent,
        BillDetailComponent
    ],
    imports: [
        CommonModule,
        BsDatepickerModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),

        SharedModule,
        RouterModule.forChild(REPORTS_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef
    ]
})
export class ReportsModule {

}
