import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SearchUsers } from 'src/app/modules/employees/store/employees.actions';
import { Customer } from 'src/app/shared/models/customer.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as CustomersActions from '../../store/customers.actions';
import { CustomerParams } from '../../store/customers.actions';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  public customer: Customer;
  public params: SearchUsers;

  public customerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    birthday: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl('', Validators.pattern('^[0-9]+$')),
    email: new FormControl('', Validators.email),
    note: new FormControl('')
  });

  constructor(public bsModalRef: BsModalRef, public store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
      this.customerForm.patchValue({
        birthday: formatDate(this.customer.birthday, 'yyyy-MM-dd', 'en')
      });
    }
  }

  get f() {
    return this.customerForm.controls;
  }

  public onSubmit(): void {
    const customer: Customer = {
      id: this.customer ? this.customer.id : null,
      name: this.f.name.value,
      birthday: this.f.birthday.value,
      address: this.f.address.value,
      phone: this.f.phone.value,
      email: this.f.email.value,
      note: this.f.note.value
    };

    const id = customer.id;

    const customerParams: CustomerParams = {
      id,
      customer,
      params: this.params
    };

    if (this.customer) {
      this.store.dispatch(new CustomersActions.UpdateCustomer(customerParams));
    } else {
      this.store.dispatch(new CustomersActions.CreateCustomer(customerParams));
    }

    this.bsModalRef.hide();
  }

}
