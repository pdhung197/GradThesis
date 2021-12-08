import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrdersSelectService } from 'src/app/core/services/orders-select.service';
import { Dish } from 'src/app/shared/models/dish.model';
import { Order } from 'src/app/shared/models/order.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as HomeActions from '../../store/home.actions';
import { OrdersSelectingComponent } from '../orders-selecting/orders-selecting.component';

@Component({
  selector: 'app-dishes-select',
  templateUrl: './dishes-select.component.html',
  styleUrls: ['./dishes-select.component.scss']
})
export class DishesSelectComponent implements OnInit, OnChanges, OnDestroy {

  @Input() categoryId: number;

  public data$: Observable<Dish[][]>;

  public imageRoot = `${environment.apiUrl}/attachments`;

  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    public ordersSelectService: OrdersSelectService) { }

  ngOnInit() {
    this.data$ = this.store.select('home').pipe(
      map((data) => {
        const tempArray: Dish[][] = [];
        for (let index = 0; index < data.menu.length; index += 2) {
            const myChunk = data.menu.slice(index, index + 2);
            tempArray.push(myChunk);
        }
        return tempArray;
      })
    );

    this.store.dispatch(new HomeActions.FetchMenu(this.categoryId));
  }

  ngOnChanges(changes) {
    if (changes.categoryId) {
      this.store.dispatch(new HomeActions.FetchMenu(this.categoryId));
    }
  }

  ngOnDestroy() {
    this.ordersSelectService.dishesSelected = 0;
  }

  public openDishesSelectingModal(): void {
    this.bsModalRef = this.modalService.show(OrdersSelectingComponent, {
      initialState: {
        ordersSelected: this.ordersSelectService.ordersSelected,
        dishesSelected: this.ordersSelectService.dishesSelected
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
