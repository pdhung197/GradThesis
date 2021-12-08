import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../store/employees.reducer';
import * as fromApp from 'src/app/store/app.reducer';
import * as EmployeesActions from '../../store/employees.actions';
import { SearchUsers, UserParams } from '../../store/employees.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchUsers;
  public userParams: UserParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public authService: AuthService) { }

  ngOnInit() {
    this.data$ = this.store.select('employees');

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
  }

  public onPageChanged(page: number): void {
    const name = this.searchForm.get('name').value;

    this.searchParams = {
      pageNumber: page,
      pageSize: 10,
      name
    };
    this.store.dispatch(new EmployeesActions.FetchUsers(this.searchParams));
  }

  public openEditModal(user: User, params: SearchUsers): void {
    this.bsModalRef = this.modalService.show(UserEditComponent, {
      initialState: {
        user,
        params
      }
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.userParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa tài khoản này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new EmployeesActions.DeleteUser(this.userParams));
          }
        }
      }
    });
  }

}
