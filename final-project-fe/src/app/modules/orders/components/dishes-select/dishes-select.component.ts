import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/shared/models/dish.model';
import { environment } from 'src/environments/environment';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../../store/orders.actions';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DishesHistoryComponent } from '../dishes-history/dishes-history.component';
import { DishesSelectingComponent } from '../dishes-selecting/dishes-selecting.component';
import { OrdersSelectService } from 'src/app/core/services/orders-select.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/shared/models/table.model';
import { Bill } from 'src/app/shared/models/bill.model';

@Component({
  selector: 'app-dishes-select',
  templateUrl: './dishes-select.component.html',
  styleUrls: ['./dishes-select.component.scss']
})
export class DishesSelectComponent implements OnInit, OnChanges, OnDestroy {

  @Input() categoryId: number;

  public data$: Observable<Dish[][]>;

  public imageRoot = `${environment.apiUrl}/attachments`;

  private tableId: number;
  private table: Table;
  private bill: Bill;

  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    public ordersSelectService: OrdersSelectService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.tableId = +params.id;
      }
    );

    this.data$ = this.store.select('orders').pipe(
      tap((data) => {
        this.table = data.table;
        this.bill = data.bill;
      }),
      map((data) => {
        const tempArray: Dish[][] = [];
        for (let index = 0; index < data.menu.length; index += 2) {
            const myChunk = data.menu.slice(index, index + 2);
            tempArray.push(myChunk);
        }
        return tempArray;
      })
    );

    this.store.dispatch(new OrdersActions.FetchMenu(this.categoryId));
    this.store.dispatch(new OrdersActions.GetTable(this.tableId));
    this.store.dispatch(new OrdersActions.GetBill(this.tableId));
  }

  ngOnChanges(changes) {
    if (changes.categoryId) {
      this.store.dispatch(new OrdersActions.FetchMenu(this.categoryId));
    }
  }

  ngOnDestroy() {
    this.ordersSelectService.dishesSelected = 0;
    this.ordersSelectService.ordersSelected = [];
  }

  public openDishesHistoryModal(): void {
    this.bsModalRef = this.modalService.show(DishesHistoryComponent, {
      initialState: {
        tableId: this.tableId,
        table: this.table,
        bill: this.bill
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDishesSelectingModal(): void {
    this.bsModalRef = this.modalService.show(DishesSelectingComponent, {
      initialState: {
        tableId: this.tableId,
        bill: this.bill
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public onSelectDish(dish: Dish): void {
    this.ordersSelectService.dishesSelected++;

    const index = this.ordersSelectService.ordersSelected.findIndex(o => o.dishId === dish.id);
    if (index > -1) {
      this.ordersSelectService.ordersSelected[index].amount++;
    } else {
      this.ordersSelectService.ordersSelected.push({
        dish,
        dishId: dish.id,
        amount: 1
      });
    }
  }

  public getDishAmount(id: number): number {
    const index = this.ordersSelectService.ordersSelected.findIndex(o => o.dishId === id);
    return this.ordersSelectService.ordersSelected[index]?.amount;
  }
}
