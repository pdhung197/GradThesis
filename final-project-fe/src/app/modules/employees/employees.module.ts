import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { EMPLOYEES_ROUTES } from './employees.routes';
import { EmployeesManageComponent } from './pages/employees-manage/employees-manage.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { UsersManageComponent } from './pages/users-manage/users-manage.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
    declarations: [
        EmployeesManageComponent,
        EmployeesTableComponent,
        EmployeeEditComponent,
        UsersManageComponent,
        UsersTableComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),

        SharedModule,
        RouterModule.forChild(EMPLOYEES_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef
    ]
})
export class EmployeesModule {

}
