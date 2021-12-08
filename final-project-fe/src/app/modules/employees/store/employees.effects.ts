import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
import { Employee, EmployeeCategory } from 'src/app/shared/models/employee.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import * as EmployeesActions from './employees.actions';

@Injectable()
export class EmployeeEffects {
    @Effect()
    fetchEmployees = this.actions$.pipe(
        ofType(EmployeesActions.FETCH_EMPLOYEES),
        switchMap((action: EmployeesActions.FetchEmployees) => {
            const paginatedResult: PaginatedResult<Employee[]> = new PaginatedResult<Employee[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name)
                .append(ParamsConstant.categorySearch, action.payload.categoryId);

            return this.http.get<Employee[]>(`${environment.apiUrl}/employees`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new EmployeesActions.SetEmployees(paginatedResult);
                })
            );
        })
    );

    @Effect()
    fetchEmployeeCategories = this.actions$.pipe(
        ofType(EmployeesActions.FETCH_EMPLOYEE_CATEGORIES),
        switchMap((action: EmployeesActions.FetchEmployeeCategories) => {
            return this.http.get<EmployeeCategory[]>(`${environment.apiUrl}/meta/employee-categories`)
                .pipe(
                    map((response) => {
                        return new EmployeesActions.SetEmployeeCategories(response);
                    })
                );
        })
    );

    @Effect()
    createEmployee = this.actions$.pipe(
        ofType(EmployeesActions.CREATE_EMPLOYEE),
        switchMap((action: EmployeesActions.CreateEmployee) => {
            return this.http.post<Employee>(`${environment.apiUrl}/employees`, action.payload.employee)
                .pipe(
                    map(() => {
                        return new EmployeesActions.FetchEmployees(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateEmployee = this.actions$.pipe(
        ofType(EmployeesActions.UPDATE_EMPLOYEE),
        switchMap((action: EmployeesActions.UpdateEmployee) => {
            return this.http.put<Employee>(`${environment.apiUrl}/employees`, action.payload.employee)
                .pipe(
                    map(() => {
                        return new EmployeesActions.FetchEmployees(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteEmployee = this.actions$.pipe(
        ofType(EmployeesActions.DELETE_EMPLOYEE),
        switchMap((action: EmployeesActions.DeleteEmployee) => {
            return this.http.delete<void>(`${environment.apiUrl}/employees/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new EmployeesActions.FetchEmployees(action.payload.params);
                })
            );
        })
    );

    @Effect()
    fetchUsers = this.actions$.pipe(
        ofType(EmployeesActions.FETCH_USERS),
        switchMap((action: EmployeesActions.FetchUsers) => {
            const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

            const params = new HttpParams()
                .append(ParamsConstant.page, action.payload.pageNumber)
                .append(ParamsConstant.pageSize, action.payload.pageSize)
                .append(ParamsConstant.nameSearch, action.payload.name);

            return this.http.get<User[]>(`${environment.apiUrl}/users`, {
                observe: 'response',
                params
            }).pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return new EmployeesActions.SetUsers(paginatedResult);
                })
            );
        })
    );

    @Effect()
    createUser = this.actions$.pipe(
        ofType(EmployeesActions.CREATE_USER),
        switchMap((action: EmployeesActions.CreateUser) => {
            return this.http.post<User>(`${environment.apiUrl}/users`, action.payload.user)
                .pipe(
                    map(() => {
                        return new EmployeesActions.FetchUsers(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    updateUser = this.actions$.pipe(
        ofType(EmployeesActions.UPDATE_USER),
        switchMap((action: EmployeesActions.UpdateUser) => {
            return this.http.put<User>(`${environment.apiUrl}/users`, action.payload.user)
                .pipe(
                    map(() => {
                        return new EmployeesActions.FetchUsers(action.payload.params);
                    })
                );
        })
    );

    @Effect()
    deleteUser = this.actions$.pipe(
        ofType(EmployeesActions.DELETE_USER),
        switchMap((action: EmployeesActions.DeleteUser) => {
            return this.http.delete<void>(`${environment.apiUrl}/users/${action.payload.id}`)
            .pipe(
                map(() => {
                    return new EmployeesActions.FetchUsers(action.payload.params);
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
