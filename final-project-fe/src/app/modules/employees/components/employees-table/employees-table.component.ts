import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Employee, EmployeeCategory } from 'src/app/shared/models/employee.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as EmployeesActions from '../../store/employees.actions';
import { EmployeeParams, SearchEmployees } from '../../store/employees.actions';
import { State } from '../../store/employees.reducer';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchEmployees;
  public employeeParams: EmployeeParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    private router: Router) { }

  ngOnInit() {
    this.data$ = this.store.select('employees');
    this.store.dispatch(new EmployeesActions.FetchEmployeeCategories());

    this.onPageChanged(1);

    this.searchForm.get('name').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });

    this.searchForm.get('categoryId').valueChanges
      .pipe(
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
  }

  public onPageChanged(page: number): void {
    const name = this.searchForm.get('name').value;
    const categoryId = this.searchForm.get('categoryId').value;

    this.searchParams = {
      pageNumber: page,
      pageSize: 10,
      name,
      categoryId
    };
    this.store.dispatch(new EmployeesActions.FetchEmployees(this.searchParams));
  }

  public openUserEditModal(employee: Employee) {
    this.bsModalRef = this.modalService.show(UserEditComponent, {
      initialState: {
        employee
      }
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openEditModal(employee: Employee, categories: EmployeeCategory[], params: SearchEmployees): void {
    this.bsModalRef = this.modalService.show(EmployeeEditComponent, {
      initialState: {
        employee,
        categories,
        params
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.employeeParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa nhân viên này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new EmployeesActions.DeleteEmployee(this.employeeParams));
          }
        }
      }
    });
  }

}
