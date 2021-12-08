import { Employee } from './employee.model';

export interface User {
    id?: number;
    name?: string;
    username?: string;
    password?: string;
    role?: string;
    employeeId?: number;
    employee?: Employee;
}
