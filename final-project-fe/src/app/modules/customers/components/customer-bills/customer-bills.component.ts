import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bill } from 'src/app/shared/models/bill.model';
import { Customer } from 'src/app/shared/models/customer.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as CustomersActions from '../../store/customers.actions';

@Component({
  selector: 'app-customer-bills',
  templateUrl: './customer-bills.component.html',
  styleUrls: ['./customer-bills.component.scss']
})
export class CustomerBillsComponent implements OnInit {

  public customer: Customer;
  public bills$: Observable<Bill[]>;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.bills$ = this.store.select('customers').pipe(
      map((data) => {
        return data.bills;
      })
    );
    this.store.dispatch(new CustomersActions.FetchBills(this.customer.id));
  }

}
