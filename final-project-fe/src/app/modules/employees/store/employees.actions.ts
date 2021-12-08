import { Action } from '@ngrx/store';
import { Employee, EmployeeCategory } from 'src/app/shared/models/employee.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { User } from 'src/app/shared/models/user.model';

export interface SearchEmployees {
    pageNumber;
    pageSize;
    name: string;
    categoryId;
}

export interface SearchUsers {
    pageNumber;
    pageSize;
    name: string;
}

export interface EmployeeParams {
    id;
    employee?: Employee;
    params: SearchEmployees;
}

export interface UserParams {
    id;
    user?: User;
    params: SearchUsers;
}

export const FETCH_EMPLOYEES = '[Employees] Fetch Employees';
export const SET_EMPLOYEES = '[Employees] Set Employees';
export const FETCH_EMPLOYEE_CATEGORIES = '[Employees] Fetch Employee Categories';
export const SET_EMPLOYEE_CATEGORIES = '[Employees] Set Employee Categories';
export const GET_EMPLOYEE = '[Employees] Get Employee';
export const CREATE_EMPLOYEE = '[Employees] Create Employee';
export const UPDATE_EMPLOYEE = '[Employees] Update Employee';
export const DELETE_EMPLOYEE = '[Employees] Delete Employee';

export class FetchEmployees implements Action {
    readonly type = FETCH_EMPLOYEES;
    constructor(public payload: SearchEmployees) {}
}

export class SetEmployees implements Action {
    readonly type = SET_EMPLOYEES;
    constructor(public payload: PaginatedResult<Employee[]>) {}
}

export class FetchEmployeeCategories implements Action {
    readonly type = FETCH_EMPLOYEE_CATEGORIES;
}

export class SetEmployeeCategories implements Action {
    readonly type = SET_EMPLOYEE_CATEGORIES;
    constructor(public payload: EmployeeCategory[]) {}
}

export class GetEmployee implements Action {
    readonly type = GET_EMPLOYEE;
    constructor(public payload: number) {}
}

export class CreateEmployee implements Action {
    readonly type = CREATE_EMPLOYEE;
    constructor(public payload: EmployeeParams) {}
}

export class UpdateEmployee implements Action {
    readonly type = UPDATE_EMPLOYEE;
    constructor(public payload: EmployeeParams) {}
}

export class DeleteEmployee implements Action {
    readonly type = DELETE_EMPLOYEE;
    constructor(public payload: EmployeeParams) {}
}

export const FETCH_USERS = '[Users] Fetch Users';
export const SET_USERS = '[Users] Set Users';
export const GET_USER = '[Users] Get User';
export const CREATE_USER = '[Users] Create User';
export const UPDATE_USER = '[Users] Update User';
export const DELETE_USER = '[Users] Delete User';

export class FetchUsers implements Action {
    readonly type = FETCH_USERS;
    constructor(public payload: SearchUsers) {}
}

export class SetUsers implements Action {
    readonly type = SET_USERS;
    constructor(public payload: PaginatedResult<User[]>) {}
}

export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload: number) {}
}

export class CreateUser implements Action {
    readonly type = CREATE_USER;
    constructor(public payload: UserParams) {}
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: UserParams) {}
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;
    constructor(public payload: UserParams) {}
}

export type EmployeesActions =
    | FetchEmployees
    | SetEmployees
    | FetchEmployeeCategories
    | SetEmployeeCategories
    | GetEmployee
    | CreateEmployee
    | UpdateEmployee
    | DeleteEmployee
    | FetchUsers
    | SetUsers
    | GetUser
    | CreateUser
    | UpdateUser
    | DeleteUser;
