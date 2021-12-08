import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrdersSelectService } from 'src/app/core/services/orders-select.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { Table } from 'src/app/shared/models/table.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../../store/orders.actions';
import { State } from '../../store/orders.reducer';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.scss']
})
export class TableOrdersComponent implements OnInit, AfterViewChecked {

  public data$: Observable<State>;

  public categoryId = 0;

  public tableId: number;
  public table: Table;

  constructor(
    public store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public ordersSelectService: OrdersSelectService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.tableId = +params.id;
      }
    );

    this.data$ = this.store.select('orders').pipe(
      tap((data) => {
        this.table = data.table;
      })
    );

    this.store.dispatch(new OrdersActions.FetchCategories());
    this.store.dispatch(new OrdersActions.GetTable(this.tableId));
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public selectCategory($event: number): void {
    this.categoryId = $event;
  }

}
