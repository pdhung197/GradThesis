import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { OrdersSelectService } from 'src/app/core/services/orders-select.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { Order } from 'src/app/shared/models/order.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as HomeActions from '../../store/home.actions';
import { AddOrdersParams } from '../../store/home.actions';

@Component({
  selector: 'app-orders-selecting',
  templateUrl: './orders-selecting.component.html',
  styleUrls: ['./orders-selecting.component.scss']
})
export class OrdersSelectingComponent implements OnInit {

  public ordersSelected: Order[];
  public dishesSelected: number;

  private booking: Booking;

  constructor(
    public bsModalRef: BsModalRef,
    public ordersSelectService: OrdersSelectService,
    public store: Store<fromApp.AppState>,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.store.select('home').pipe(
      tap((data) => {
        this.booking = data.booking;
      })
    ).subscribe();
  }

  public onReduceAmount(index: number): void {
    this.ordersSelected[index].amount--;
    this.ordersSelectService.dishesSelected--;
  }

  public onAddAmount(index: number): void {
    this.ordersSelected[index].amount++;
    this.ordersSelectService.dishesSelected++;
  }

  public onRemoveOrder(index: number): void {
    this.ordersSelectService.dishesSelected -= this.ordersSelected[index].amount;
    this.ordersSelected.splice(index, 1);
  }

  public onSubmit(): void {
    const addOrdersParams: AddOrdersParams = {
      bookingId: this.booking.id,
      orders: this.ordersSelected
    };

    this.ordersSelectService.dishesSelected = 0;
    this.ordersSelectService.ordersSelected = [];
    this.dishesSelected = 0;
    this.ordersSelected = [];

    this.store.dispatch(new HomeActions.AddOrders(addOrdersParams));

    this.bsModalRef.hide();
    this.alertify.success('Thông tin đặt món của bạn đã được ghi lại thành công');
  }

}
