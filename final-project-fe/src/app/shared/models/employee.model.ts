export interface Employee {
    id?: number;
    name?: string;
    sex?: boolean;
    phone?: string;
    email?: string;
    idCardNumber?: string;
    address?: string;
    status?: string;
    employeeCategoryId?: number;
    employeeCategory?: EmployeeCategory;
}

export interface EmployeeCategory {
    id?: number;
    name?: string;
}
