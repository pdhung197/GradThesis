import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CustomerEditComponent } from 'src/app/modules/customers/components/customer-edit/customer-edit.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Bill } from 'src/app/shared/models/bill.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { Table } from 'src/app/shared/models/table.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../../store/orders.actions';
import { AddCustomerParams } from '../../store/orders.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {

  public tableId: number;
  public table$: Observable<Table>;

  public bill: Bill;
  public customer$: Observable<Customer>;
  private customerId: number;

  public customerForm: FormGroup;

  constructor(
    public store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.tableId = +this.route.snapshot.params.id;

    this.table$ = this.store.select('orders').pipe(
      map((data) => {
        return data.table;
      })
    );
    this.customer$ = this.store.select('orders').pipe(
      map((data) => {
        this.customerId = data.customer?.id;
        return data.customer;
      })
    );

    this.store.dispatch(new OrdersActions.GetTable(this.tableId));

    this.customerForm = new FormGroup({
      customerCtrl: new FormControl({ value: '', disabled: this.bill?.customerId })
    });

    this.customerForm.get('customerCtrl').valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(() => {
        const name = this.customerForm.get('customerCtrl').value;
        if (name) {
          this.store.dispatch(new OrdersActions.FetchCustomer(name));
        }
      });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getBill(bill: Bill): void {
    this.bill = bill;
    if (bill && bill.customerId) {
      this.customer$ = of(bill.customer);
    }
  }

  public openAddCustomerModal(): void {
    this.bsModalRef = this.modalService.show(CustomerEditComponent, {
      initialState: {},
      class: 'modal-lg'
    });
  }

  public selectCustomer(): void {
    const addCustomerParams: AddCustomerParams = {
      id: this.bill.id,
      customerId: this.customerId,
      tableId: this.tableId
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Sau khi xác nhận khách hàng sẽ không thể thay đổi. Bạn có chắc chắn xác nhận khách hàng này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new OrdersActions.AddCustomer(addCustomerParams));
          }
        }
      }
    });
  }

}
