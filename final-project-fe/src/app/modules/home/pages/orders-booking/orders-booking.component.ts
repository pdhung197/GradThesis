import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/home.reducer';
import * as fromApp from 'src/app/store/app.reducer';
import * as HomeActions from '../../store/home.actions';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersSelectService } from 'src/app/core/services/orders-select.service';

@Component({
  selector: 'app-orders-booking',
  templateUrl: './orders-booking.component.html',
  styleUrls: ['./orders-booking.component.scss']
})
export class OrdersBookingComponent implements OnInit, AfterViewChecked, OnDestroy {

  public data$: Observable<State>;
  public ordersSelected: Order[] = [];

  public categoryId = 0;

  constructor(public store: Store<fromApp.AppState>, private cdr: ChangeDetectorRef, public ordersSelectService: OrdersSelectService) { }

  ngOnInit() {
    this.data$ = this.store.select('home');

    this.store.dispatch(new HomeActions.FetchCategories());
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.ordersSelectService.dishesSelected = 0;
    this.ordersSelectService.ordersSelected = [];
  }

  public selectCategory($event: number): void {
    this.categoryId = $event;
  }

}
