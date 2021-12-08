import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OrdersSelectService } from 'src/app/core/services/orders-select.service';
import { Bill } from 'src/app/shared/models/bill.model';
import { Order } from 'src/app/shared/models/order.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../../store/orders.actions';
import { AddOrdersParams, CreateBillParams } from '../../store/orders.actions';

@Component({
  selector: 'app-dishes-selecting',
  templateUrl: './dishes-selecting.component.html',
  styleUrls: ['./dishes-selecting.component.scss']
})
export class DishesSelectingComponent implements OnInit {

  public tableId: number;
  public bill: Bill;

  constructor(public bsModalRef: BsModalRef, public ordersSelectService: OrdersSelectService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  public onReduceAmount(index: number): void {
    this.ordersSelectService.ordersSelected[index].amount--;
    this.ordersSelectService.dishesSelected--;
  }

  public onAddAmount(index: number): void {
    this.ordersSelectService.ordersSelected[index].amount++;
    this.ordersSelectService.dishesSelected++;
  }

  public onRemoveOrder(index: number): void {
    this.ordersSelectService.dishesSelected -= this.ordersSelectService.ordersSelected[index].amount;
    this.ordersSelectService.ordersSelected.splice(index, 1);
  }

  public onSubmit(): void {
    if (this.bill) {
      const addOrdersParams: AddOrdersParams = {
        orders: this.ordersSelectService.ordersSelected,
        tableId: this.tableId
      };

      this.store.dispatch(new OrdersActions.AddOrders(addOrdersParams));
    } else {
      const bill: Bill = {
        tableId: this.tableId,
        orders: this.ordersSelectService.ordersSelected
      };

      const createBillParams: CreateBillParams = {
        bill,
        tableId: this.tableId
      };

      this.store.dispatch(new OrdersActions.CreateBill(createBillParams));
    }

    this.ordersSelectService.ordersSelected = [];
    this.ordersSelectService.dishesSelected = 0;
    this.bsModalRef.hide();
  }

}
