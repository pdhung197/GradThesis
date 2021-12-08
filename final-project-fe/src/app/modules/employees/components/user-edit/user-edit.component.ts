import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { SearchUsers } from '../../store/employees.actions';
import * as EmployeesActions from '../../store/employees.actions';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user: User;
  public params: SearchUsers;
  public employee: Employee;

  public userForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, public store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      name: new FormControl((this.employee) ? this.employee.name : '', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', (this.user) ? [] : [Validators.required]),
      role: new FormControl('EMPLOYEE', Validators.required)
    });

    if (this.user) {
      if (this.employee) {
        this.user.employeeId = this.employee.id;
      }
      this.userForm.patchValue(this.user);
    }
  }

  get f() {
    return this.userForm.controls;
  }

  public onSubmit(): void {
    const user: User = {
      id: this.user ? this.user.id : null,
      name: this.f.name.value,
      username: this.f.username.value,
      password: this.f.password.value,
      role: this.f.role.value,
      employeeId: this.employee ? this.employee.id : this.user.employeeId
    };

    const id = user.id;

    const userParams: EmployeesActions.UserParams = {
      id,
      user,
      params: this.params
    };

    if (this.user) {
      this.store.dispatch(new EmployeesActions.UpdateUser(userParams));
    } else {
      this.store.dispatch(new EmployeesActions.CreateUser(userParams));
    }

    this.bsModalRef.hide();
  }

}
