import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { INgxSelectOption } from 'ngx-select-ex';
import { tap } from 'rxjs/operators';
import { Booking } from 'src/app/shared/models/booking.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Order } from 'src/app/shared/models/order.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as BookingsActions from '../../store/bookings.actions';
import { SearchBookings, UpdateOrdersParams } from '../../store/bookings.actions';

@Component({
  selector: 'app-booking-orders',
  templateUrl: './booking-orders.component.html',
  styleUrls: ['./booking-orders.component.scss']
})
export class BookingOrdersComponent implements OnInit {

  public booking: Booking;
  public params: SearchBookings;

  public total = 0;

  public allDishes: Dish[];

  public selectedOrders: Order[] = [];
  public selectedDishesIds: number[] = [];

  public amount = 0;
  public dish: Dish;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.booking.orders) {
      this.selectedOrders.push(...this.booking.orders);

      for (const order of this.booking.orders) {
        this.total += order.dish.price * order.amount;
      }
    }

    this.store.select('bookings').pipe(
      tap((data) => {
        this.allDishes = data.dishes;
      })
    ).subscribe();
    this.store.dispatch(new BookingsActions.FetchAllDishes());
  }

  public onSelectDish(options: INgxSelectOption[]): void {
    for (const option of options) {
      this.dish = this.allDishes.find(d => d.id === option.value);
    }
  }

  public onAddDish(): void {
    const index = this.selectedOrders.findIndex(o => o.dishId === this.dish.id);
    if (index === -1) {
      this.selectedOrders.push({
        dishId: this.dish.id,
        dish: this.dish,
        amount: this.amount
      });
    } else {
      this.selectedOrders[index] = {
        dishId: this.dish.id,
        dish: this.dish,
        amount: this.selectedOrders[index].amount + 1
      };
    }

    this.calculateTotal();

    this.dish = null;
    this.selectedDishesIds = [];
    this.amount = 0;

    console.log(this.selectedOrders);
  }

  public onAddAmount(index: number): void {
    this.selectedOrders[index] = {
      dishId: this.selectedOrders[index].dish.id,
      dish: this.selectedOrders[index].dish,
      amount: this.selectedOrders[index].amount + 1
    };

    this.calculateTotal();
  }

  public onReduceAmount(index: number): void {
    this.selectedOrders[index] = {
      dishId: this.selectedOrders[index].dish.id,
      dish: this.selectedOrders[index].dish,
      amount: this.selectedOrders[index].amount - 1
    };

    this.calculateTotal();
  }

  public onRemoveOrder(index: number): void {
    this.selectedOrders.splice(index, 1);
    this.calculateTotal();
  }

  public onSubmit(): void {
    const updateOrdersParams: UpdateOrdersParams = {
      bookingId: this.booking.id,
      orders: this.selectedOrders,
      params: this.params
    };

    this.store.dispatch(new BookingsActions.UpdateOrders(updateOrdersParams));
    this.bsModalRef.hide();
  }

  private calculateTotal(): void {
    this.total = 0;
    for (const order of this.selectedOrders) {
      this.total += order.dish.price * order.amount;
    }
  }

}
