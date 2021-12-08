import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Employee, EmployeeCategory } from 'src/app/shared/models/employee.model';
import * as EmployeesActions from '../../store/employees.actions';
import { EmployeeParams, SearchEmployees } from '../../store/employees.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  public employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    sex: new FormControl(false, Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    email: new FormControl('', Validators.email),
    idCardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    address: new FormControl(''),
    status: new FormControl('Working', Validators.required),
    employeeCategoryId: new FormControl('', Validators.required)
  });

  public employee: Employee;
  public categories: EmployeeCategory[];
  public params: SearchEmployees;

  constructor(public bsModalRef: BsModalRef, public store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  get f() {
    return this.employeeForm.controls;
  }

  public onSubmit(): void {
    const employee: Employee = {
      id: this.employee ? this.employee.id : null,
      name: this.f.name.value,
      sex: this.f.sex.value,
      phone: this.f.phone.value,
      email: this.f.email.value,
      idCardNumber: this.f.idCardNumber.value,
      address: this.f.address.value,
      status: this.f.status.value,
      employeeCategoryId: +this.f.employeeCategoryId.value
    };

    const id = employee.id;

    const employeeParams: EmployeeParams = {
      id,
      employee,
      params: this.params
    };

    if (this.employee) {
      this.store.dispatch(new EmployeesActions.UpdateEmployee(employeeParams));
    } else {
      this.store.dispatch(new EmployeesActions.CreateEmployee(employeeParams));
    }

    this.bsModalRef.hide();
  }

}
