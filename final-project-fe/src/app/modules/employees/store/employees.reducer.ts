import { Employee, EmployeeCategory } from 'src/app/shared/models/employee.model';
import { PaginatedResult } from 'src/app/shared/models/pagination.model';
import { User } from 'src/app/shared/models/user.model';
import * as EmployeesActions from './employees.actions';

export interface State {
    employees: PaginatedResult<Employee[]>;
    employeeCategories: EmployeeCategory[];
    users: PaginatedResult<User[]>;
}

const initEmployees = new PaginatedResult<Employee[]>();
initEmployees.result = [];
initEmployees.pagination = {
    totalItems: 0
};

const initUsers = new PaginatedResult<User[]>();
initUsers.result = [];
initUsers.pagination = {
    totalItems: 0
};

export const initialState: State = {
    employees: initEmployees,
    employeeCategories: [],
    users: initUsers
};

export function employeeReducer(
    state: State = initialState,
    action: EmployeesActions.EmployeesActions
) {
    switch (action.type) {
        case EmployeesActions.SET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        case EmployeesActions.SET_EMPLOYEE_CATEGORIES:
            return {
                ...state,
                employeeCategories: action.payload
            };
        case EmployeesActions.SET_USERS:
            return {
                ...state,
                users: action.payload
            };
        default:
            return {
                ...state
            };
    }
}
