import { Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { EmployeesManageComponent } from './pages/employees-manage/employees-manage.component';
import { UsersManageComponent } from './pages/users-manage/users-manage.component';

export const EMPLOYEES_ROUTES: Routes = [
    {
        path: '',
        component: EmployeesManageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AdminGuard]
    },
    {
        path: 'tai-khoan',
        component: UsersManageComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AdminGuard]
    }
];
