import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Table } from 'src/app/shared/models/table.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../../store/orders.actions';
import { State } from '../../store/orders.reducer';

@Component({
  selector: 'app-checkout-booking',
  templateUrl: './checkout-booking.component.html',
  styleUrls: ['./checkout-booking.component.scss']
})
export class CheckoutBookingComponent implements OnInit {

  public tableId: number;
  public data$: Observable<State>;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tableId = +this.route.snapshot.params.id;
    this.data$ = this.store.select('orders');

    this.store.dispatch(new OrdersActions.GetTable(this.tableId));
    this.store.dispatch(new OrdersActions.GetBooking(this.tableId));
  }

}
