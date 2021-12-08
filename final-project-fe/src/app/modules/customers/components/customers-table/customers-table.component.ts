import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Bill } from 'src/app/shared/models/bill.model';
import { Customer } from 'src/app/shared/models/customer.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as CustomersActions from '../../store/customers.actions';
import { CustomerParams, SearchCustomers } from '../../store/customers.actions';
import { State } from '../../store/customers.reducer';
import { CustomerBillsComponent } from '../customer-bills/customer-bills.component';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchCustomers;
  public customerParams: CustomerParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public auth: AuthService) { }

  ngOnInit() {
    this.data$ = this.store.select('customers');

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
    this.store.dispatch(new CustomersActions.FetchCustomers(this.searchParams));
  }

  public openHistoryModal(customer: Customer): void {
    this.bsModalRef = this.modalService.show(CustomerBillsComponent, {
      initialState: {
        customer
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openEditModal(customer: Customer, params: SearchCustomers): void {
    this.bsModalRef = this.modalService.show(CustomerEditComponent, {
      initialState: {
        customer,
        params
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.customerParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa khách hàng này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new CustomersActions.DeleteCustomer(this.customerParams));
          }
        }
      }
    });
  }

}
